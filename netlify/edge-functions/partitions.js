export default async function handler(req, context){
    //// Partitions ////

    // Declare global label
    let label = 1;

    // Randoms
    // coin(): return 0 or 1
    function coin(){
        return Math.floor(Math.random() * 2);
    }

    // three(): return 0, 1, or 2
    function three(){
        return Math.floor(Math.random() * 3);
    }

    // sample(xs): return one x
    function sample(xs){
        return xs[Math.floor(Math.random() * xs.length)];
    }

    // colrand(): returns a random pleasant color, from ~glitch-colors
    function colrand(A){
        A = A || 1;
        function helper(S_min, S_max){
            // Hue ranges from -30 to 60, then 145 to 155, giving an effective range of 100
            // Saturation ranges from 0 to 100
            // Value ranges from 15 points below Saturation to 100 bounded within 0 to 100
            // Saturation uses S_min and S_max to create bounds for each run, as there tends to be 2 low sats, 2 mids, and 1 high.
            let H = Math.random()*100;
            if (H < 90) H -= 30;
            else H += 55;
            if (H < 0) H += 360;
            let S = S_min + Math.random()*(S_max - S_min);
            let V_min = Math.max(0, S-15);
            let V_max = 100
            let V = V_min + Math.random()*(V_max - V_min);
            return `hsla(${H}, ${S}%, ${V}%, ${A})`;
        }
    
        let X = Math.floor(Math.random()*5);
        if (X < 2) return helper(0, 40);
        else if (X < 4) return helper(40, 60);
        else return helper(60, 100);
    }

    // Create a random first row
    // by deciding at each step to either (i)
    // stretch the previous region or (ii)
    // start a new region
    function firstrow_s(N){
        label = 1;
        let row = [1];
        for (let I=1; I<N; ++I){
            let bit = coin();
            if (bit){
                row.push(row[I-1]);
            } else {
                label += 1;
                row.push(label);
            }
        }
        
        return [row];
    }

    // Create a new row based on the previous
    // by deciding at each step to either (i)
    // stretch the region above down into this
    // row or (ii) stretch the region on the left
    // to the right or (iii) start a new region.
    function addrow_s(grid, N, M){
        let row = [];
        let is_pulling_down = false;
        let last_row = grid[grid.length-1];
        for (let I=0; I<N; ++I){
            if (I === 0){ // only two options at the beginning
                let bit = coin();
                if (bit){ // grow down
                    is_pulling_down = true;
                    row.push(last_row[I]);
                } else { // start a new region
                    is_pulling_down = false;
                    label += 1;
                    row.push(label);
                }
            } else { // need to check some conditions otherwise
                if (is_pulling_down && last_row[I] === last_row[I-1]){ // keep growing down
                    row.push(last_row[I]);
                } else if (is_pulling_down && last_row[I] !== last_row[I-1]){ // cannot grow right
                    let bit = coin();
                    if (bit){ // grow down
                        is_pulling_down = true;
                        row.push(last_row[I]);
                    } else { // start a new region
                        is_pulling_down = false;
                        label += 1;
                        row.push(label);
                    }
                } else if (!is_pulling_down && last_row[I] === last_row[I-1]){ // cannot grow down
                    let bit = coin();
                    if (bit){ // grow right
                        is_pulling_down = false;
                        row.push(row[I-1]);
                    } else { // start a new region
                        is_pulling_down = false;
                        label += 1;
                        row.push(label);
                    }
                } else { // three options otherwise
                    let bit = three();
                    if (bit === 1){ // grow down
                        is_pulling_down = true;
                        row.push(last_row[I]);
                    } else if (bit === 0){ // start a new region
                        is_pulling_down = false;
                        label += 1;
                        row.push(label);
                    } else { // 2, grow right
                        is_pulling_down = false;
                        row.push(row[I-1]);
                    }
                }
            }
        }
        
        grid.push(row);
    }

    // Create a new row based on the previous
    // by deciding at each step to either (i)
    // stretch the region above down into this
    // row or (ii) stretch the region on the left
    // to the right or (iii) start a new region or
    // (iv) stretch the region on the right to the left
    function partition_t(N, M){
        // randomly generate the disjoint set following neighboring rules
        const disjoint_set = Array.from({length: N*M});
        const neighbors = function(I){
            // I is a neighbor of itself
            const ns = [I];

            // I is a neighbor of the one above it
            if (I > N){
                // I can only be a neighbor of the one above it when it would be drawn pointing down
                const i = I % N;
                const j = Math.floor(I / N);
                if ((i+j) % 2 === 0){
                    ns.push(I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N); // over sample neighbors other than I itself, to bias towards longer chains
                }
            }

            // I is a neighbor with those left and right of it,
            // but not if they already point to I
            if (I % N !== 0   && disjoint_set[I-1] !== I){
                ns.push(I-1, I-1, I-1, I-1, I-1);
            }
            if (I % N !== N-1 && disjoint_set[I+1] !== I){
                ns.push(I+1, I+1, I+1, I+1, I+1);
            }

            return ns;
        };

        for (const i in disjoint_set){
            const I = parseInt(i);
            disjoint_set[i] = sample(neighbors(I));
        }

        // flatten the disjoint set
        const flatten = function(I){
            const i = I;
            if (disjoint_set[i] != I){
                disjoint_set[i] = flatten(disjoint_set[i]);
            }

            return disjoint_set[i];
        };

        for (const i in disjoint_set){
            const I = parseInt(i);
            disjoint_set[i] = flatten(I);
        }

        // reshape to 2d grid
        const grid = [];
        while (disjoint_set.length) grid.push(disjoint_set.splice(0, N));
        return grid;
    }

    // Populate a full grid
    function partition_s(N, M){
        const grid = firstrow_s(N);
        for (let J=1; J < M; ++J){
            addrow_s(grid, N, M);
        }
        
        return grid;
    }

    // Convert a grid to svg code: squares pattern
    function to_svg_s(grid, N, M, svgwidth, svgheight, T, R, opacity){
        const colors = {};
        console.log(grid);
        function rect(I, J){
            const width = 100/N; // 100% / N
            const height = 100/M;
            const x = J*100/N + R*Math.random()/N - R/N/2;
            const y = I*100/M + R*Math.random()/M - R/M/2;
            if (typeof colors[grid[I][J]] === "undefined"){
                if (Math.random() > T){
                    colors[grid[I][J]] = colrand(opacity/100);
                } else {
                    colors[grid[I][J]] = "transparent";
                }
            }
            
            const fill = colors[grid[I][J]];
            return `<rect
                        width="${width}%"
                        height="${height}%"
                        x="${x}%"
                        y="${y}%"
                        fill="${fill}"
                        stroke="${fill}"
                        stroke-opacity="${opacity}%"
                    />`;
        }
        
        const bg = colrand();
        let svg = `<svg width="${svgwidth}" height="${svgheight}" xmlns="http://www.w3.org/2000/svg" style="background: ${bg}">`;
        for (let I=0; I < M; ++I){
            for (let J=0; J < N; ++J){
                svg += rect(I, J)
            }
        }

        svg += `</svg>`;
        return svg;
    }

    // Convert a grid to svg code: triangles pattern
    function to_svg_t(grid, N, M, svgwidth, svgheight, T, R, opacity){
        const colors = {};
        function triangle(I, J){
            const width = svgwidth/N;
            const height = svgheight/M;
            const x = J*svgwidth/N + R*Math.random()/N - R/N/2;
            const y = I*svgheight/M + R*Math.random()/M - R/M/2;
            if (typeof colors[grid[I][J]] === "undefined"){
                if (Math.random() > T){
                    colors[grid[I][J]] = colrand(opacity/100);
                } else {
                    colors[grid[I][J]] = "transparent";
                }
            }
            
            const fill = colors[grid[I][J]];
            const points = (I+J) % 2 === 0 ?
                `${x-width},${y}        ${x+width},${y}        ${x},${y+height}` :
                `${x-width},${y+height} ${x+width},${y+height} ${x},${y}`;
            return `<polygon
                        points="${points}"
                        fill="${fill}"
                        stroke="transparent"
                        stroke-opacity="${opacity}%"
                    />`;
        }
        
        const bg = colrand();
        let svg = `<svg width="${svgwidth}" height="${svgheight}" xmlns="http://www.w3.org/2000/svg" style="background: ${bg}">`;
        for (let I=0; I < M; ++I){
            for (let J=0; J < N; ++J){
                svg += triangle(I, J);
            }
        }

        svg += `</svg>`;
        return svg;
    }

    //// Main ////

    const params = new URL(req.url).searchParams;
    const svgwidth = parseInt(params.get("w") ?? 1000),
          svgheight = parseInt(params.get("h") ?? 1000),
          T = parseInt(params.get("t") ?? 20)/100,
          R = parseInt(params.get("r") ?? 20),
          opacity = parseInt(params.get("o") ?? 90),
          size = parseInt(params.get("s") ?? 20),
          pattern = (params.get("p") ?? "s").toLowerCase();

    const partition = {
        "s": partition_s,
        "t": partition_t
    }[pattern] ?? partition_s;

    const to_svg = {
        "s": to_svg_s,
        "t": to_svg_t
    }[pattern] ?? to_svg_s;

    const N = Math.floor(svgwidth / size),
          M = Math.floor(svgheight / size),
          grid = partition(N, M),
          svg = to_svg(grid, N, M, svgwidth, svgheight, T, R, opacity);

    return new Response(svg, {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml"
        }
    });
}

export const config = { path: "/" };
