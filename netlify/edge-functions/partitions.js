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
    // Comprehensive (?) list of valid Twemoji single codepoint ranges
    const TWEMOJI_RANGES = [
        [0x0023, 0x0023], // #
        [0x002A, 0x002A], // *
        [0x0030, 0x0039], // 0-9
        [0x00A9, 0x00A9], // ©
        [0x00AE, 0x00AE], // ®
        [0x203C, 0x203C], // ‼
        [0x2049, 0x2049], // ⁉
        [0x2122, 0x2122], // ™
        [0x2139, 0x2139], // ℹ
        [0x2194, 0x2199], // ↔-↙
        [0x21A9, 0x21AA], // ↩-↪
        [0x231A, 0x231B], // ⌚-⌛
        [0x2328, 0x2328], // ⌨
        [0x23CF, 0x23CF], // ⏏
        [0x23E9, 0x23F3], // ⏩-⏳
        [0x23F8, 0x23FA], // ⏸-⏺
        [0x24C2, 0x24C2], // Ⓜ
        [0x25AA, 0x25AB], // ▪-▫
        [0x25B6, 0x25B6], // ▶
        [0x25C0, 0x25C0], // ◀
        [0x25FB, 0x25FE], // ◻-◾
        [0x2600, 0x2604], // ☀-☄
        [0x260E, 0x260E], // ☎
        [0x2611, 0x2611], // ☑
        [0x2614, 0x2615], // ☔-☕
        [0x2618, 0x2618], // ☘
        [0x261D, 0x261D], // ☝
        [0x2620, 0x2620], // ☠
        [0x2622, 0x2623], // ☢-☣
        [0x2626, 0x2626], // ☦
        [0x262A, 0x262A], // ☪
        [0x262E, 0x262F], // ☮-☯
        [0x2638, 0x263A], // ☸-☺
        [0x2640, 0x2640], // ♀
        [0x2642, 0x2642], // ♂
        [0x2648, 0x2653], // ♈-♓
        [0x265F, 0x2660], // ♟-♠
        [0x2663, 0x2663], // ♣
        [0x2665, 0x2666], // ♥-♦
        [0x2668, 0x2668], // ♨
        [0x267B, 0x267B], // ♻
        [0x267E, 0x267F], // ♾-♿
        [0x2692, 0x2697], // ⚒-⚗
        [0x2699, 0x2699], // ⚙
        [0x269B, 0x269C], // ⚛-⚜
        [0x26A0, 0x26A1], // ⚠-⚡
        [0x26A7, 0x26A7], // ⚧
        [0x26AA, 0x26AB], // ⚪-⚫
        [0x26B0, 0x26B1], // ⚰-⚱
        [0x26BD, 0x26BE], // ⚽-⚾
        [0x26C4, 0x26C5], // ⛄-⛅
        [0x26C8, 0x26C8], // ⛈
        [0x26CE, 0x26CF], // ⛎-⛏
        [0x26D1, 0x26D1], // ⛑
        [0x26D3, 0x26D4], // ⛓-⛔
        [0x26E9, 0x26EA], // ⛩-⛪
        [0x26F0, 0x26F5], // ⛰-⛵
        [0x26F7, 0x26FA], // ⛷-⛺
        [0x26FD, 0x26FD], // ⛽
        [0x2702, 0x2702], // ✂
        [0x2705, 0x2705], // ✅
        [0x2708, 0x270D], // ✈-✍
        [0x270F, 0x270F], // ✏
        [0x2712, 0x2712], // ✒
        [0x2714, 0x2714], // ✔
        [0x2716, 0x2716], // ✖
        [0x271D, 0x271D], // ✝
        [0x2721, 0x2721], // ✡
        [0x2728, 0x2728], // ✨
        [0x2733, 0x2734], // ✳-✴
        [0x2744, 0x2744], // ❄
        [0x2747, 0x2747], // ❇
        [0x274C, 0x274C], // ❌
        [0x274E, 0x274E], // ❎
        [0x2753, 0x2755], // ❓-❕
        [0x2757, 0x2757], // ❗
        [0x2763, 0x2764], // ❣-❤
        [0x2795, 0x2797], // ➕-➗
        [0x27A1, 0x27A1], // ➡
        [0x27B0, 0x27B0], // ➰
        [0x27BF, 0x27BF], // ➿
        [0x2934, 0x2935], // ⤴-⤵
        [0x2B05, 0x2B07], // ⬅-⬇
        [0x2B1B, 0x2B1C], // ⬛-⬜
        [0x2B50, 0x2B50], // ⭐
        [0x2B55, 0x2B55], // ⭕
        [0x3030, 0x3030], // 〰
        [0x303D, 0x303D], // 〽
        [0x3297, 0x3297], // ㊗
        [0x3299, 0x3299], // ㊙
        [0x1F004, 0x1F004], // 🀄
        [0x1F0CF, 0x1F0CF], // 🃏
        [0x1F170, 0x1F171], // 🅰-🅱
        [0x1F17E, 0x1F17F], // 🅾-🅿
        [0x1F18E, 0x1F18E], // 🆎
        [0x1F191, 0x1F19A], // 🆑-🆚
        [0x1F1E6, 0x1F1FF], // 🇦-🇿 (regional indicators)
        [0x1F201, 0x1F202], // 🈁-🈂
        [0x1F21A, 0x1F21A], // 🈚
        [0x1F22F, 0x1F22F], // 🈯
        [0x1F232, 0x1F23A], // 🈲-🈺
        [0x1F250, 0x1F251], // 🉐-🉑
        [0x1F300, 0x1F320], // 🌀-🌠
        [0x1F321, 0x1F32C], // 🌡-🌬
        [0x1F32D, 0x1F32F], // 🌭-🌯
        [0x1F330, 0x1F335], // 🌰-🌵
        [0x1F337, 0x1F37C], // 🌷-🍼
        [0x1F37D, 0x1F37F], // 🍽-🍿
        [0x1F380, 0x1F393], // 🎀-🎓
        [0x1F396, 0x1F397], // 🎖-🎗
        [0x1F399, 0x1F39B], // 🎙-🎛
        [0x1F39E, 0x1F39F], // 🎞-🎟
        [0x1F3A0, 0x1F3C4], // 🎠-🏄
        [0x1F3C5, 0x1F3C5], // 🏅
        [0x1F3C6, 0x1F3CA], // 🏆-🏊
        [0x1F3CB, 0x1F3CE], // 🏋-🏎
        [0x1F3CF, 0x1F3D3], // 🏏-🏓
        [0x1F3D4, 0x1F3DF], // 🏔-🏟
        [0x1F3E0, 0x1F3F0], // 🏠-🏰
        [0x1F3F3, 0x1F3F5], // 🏳-🏵
        [0x1F3F7, 0x1F3F7], // 🏷
        [0x1F3F8, 0x1F3FF], // 🏸-🏿
        [0x1F400, 0x1F43E], // 🐀-🐾
        [0x1F43F, 0x1F43F], // 🐿
        [0x1F440, 0x1F440], // 👀
        [0x1F441, 0x1F441], // 👁
        [0x1F442, 0x1F4F7], // 👂-📷
        [0x1F4F8, 0x1F4F8], // 📸
        [0x1F4F9, 0x1F4FC], // 📹-📼
        [0x1F4FD, 0x1F4FD], // 📽
        [0x1F4FF, 0x1F4FF], // 📿
        [0x1F500, 0x1F53D], // 🔀-🔽
        [0x1F549, 0x1F54A], // 🕉-🕊
        [0x1F54B, 0x1F54E], // 🕋-🕎
        [0x1F550, 0x1F567], // 🕐-🕧
        [0x1F56F, 0x1F570], // 🕯-🕰
        [0x1F573, 0x1F579], // 🕳-🕹
        [0x1F57A, 0x1F57A], // 🕺
        [0x1F587, 0x1F587], // 🖇
        [0x1F58A, 0x1F58D], // 🖊-🖍
        [0x1F590, 0x1F590], // 🖐
        [0x1F595, 0x1F596], // 🖕-🖖
        [0x1F5A4, 0x1F5A4], // 🖤
        [0x1F5A5, 0x1F5A5], // 🖥
        [0x1F5A8, 0x1F5A8], // 🖨
        [0x1F5B1, 0x1F5B2], // 🖱-🖲
        [0x1F5BC, 0x1F5BC], // 🖼
        [0x1F5C2, 0x1F5C4], // 🗂-🗄
        [0x1F5D1, 0x1F5D3], // 🗑-🗓
        [0x1F5DC, 0x1F5DE], // 🗜-🗞
        [0x1F5E1, 0x1F5E1], // 🗡
        [0x1F5E3, 0x1F5E3], // 🗣
        [0x1F5E8, 0x1F5E8], // 🗨
        [0x1F5EF, 0x1F5EF], // 🗯
        [0x1F5F3, 0x1F5F3], // 🗳
        [0x1F5FA, 0x1F5FA], // 🗺
        [0x1F5FB, 0x1F5FF], // 🗻-🗿
        [0x1F600, 0x1F64F], // 😀-🙏
        [0x1F680, 0x1F6C5], // 🚀-🛅
        [0x1F6CB, 0x1F6CF], // 🛋-🛏
        [0x1F6D0, 0x1F6D0], // 🛐
        [0x1F6D1, 0x1F6D2], // 🛑-🛒
        [0x1F6D5, 0x1F6D7], // 🛕-🛗
        [0x1F6DC, 0x1F6DF], // 🛜-🛟
        [0x1F6E0, 0x1F6E5], // 🛠-🛥
        [0x1F6E9, 0x1F6E9], // 🛩
        [0x1F6EB, 0x1F6EC], // 🛫-🛬
        [0x1F6F0, 0x1F6F0], // 🛰
        [0x1F6F3, 0x1F6F3], // 🛳
        [0x1F6F4, 0x1F6FC], // 🛴-🛼
        [0x1F7E0, 0x1F7EB], // 🟠-🟫
        [0x1F7F0, 0x1F7F0], // 🟰
        [0x1F90C, 0x1F90C], // 🤌
        [0x1F90D, 0x1F90F], // 🤍-🤏
        [0x1F910, 0x1F918], // 🤐-🤘
        [0x1F919, 0x1F91E], // 🤙-🤞
        [0x1F91F, 0x1F91F], // 🤟
        [0x1F920, 0x1F927], // 🤠-🤧
        [0x1F928, 0x1F92F], // 🤨-🤯
        [0x1F930, 0x1F930], // 🤰
        [0x1F931, 0x1F932], // 🤱-🤲
        [0x1F933, 0x1F93A], // 🤳-🤺
        [0x1F93C, 0x1F93E], // 🤼-🤾
        [0x1F93F, 0x1F93F], // 🤿
        [0x1F940, 0x1F945], // 🥀-🥅
        [0x1F947, 0x1F976], // 🥇-🥶
        [0x1F977, 0x1F978], // 🥷-🥸
        [0x1F979, 0x1F979], // 🥹
        [0x1F97A, 0x1F97A], // 🥺
        [0x1F97B, 0x1F97B], // 🥻
        [0x1F97C, 0x1F97F], // 🥼-🥿
        [0x1F980, 0x1F984], // 🦀-🦄
        [0x1F985, 0x1F991], // 🦅-🦑
        [0x1F992, 0x1F997], // 🦒-🦗
        [0x1F998, 0x1F9A2], // 🦘-🦢
        [0x1F9A3, 0x1F9A4], // 🦣-🦤
        [0x1F9A5, 0x1F9AA], // 🦥-🦪
        [0x1F9AB, 0x1F9AD], // 🦫-🦭
        [0x1F9AE, 0x1F9AF], // 🦮-🦯
        [0x1F9B0, 0x1F9B9], // 🦰-🦹
        [0x1F9BA, 0x1F9BF], // 🦺-🦿
        [0x1F9C0, 0x1F9C0], // 🧀
        [0x1F9C1, 0x1F9C2], // 🧁-🧂
        [0x1F9C3, 0x1F9CA], // 🧃-🧊
        [0x1F9CB, 0x1F9CB], // 🧋
        [0x1F9CD, 0x1F9CF], // 🧍-🧏
        [0x1F9D0, 0x1F9E6], // 🧐-🧦
        [0x1F9E7, 0x1F9E7], // 🧧
        [0x1F9E8, 0x1F9E9], // 🧨-🧩
        [0x1F9EA, 0x1F9EC], // 🧪-🧬
        [0x1F9ED, 0x1F9EF], // 🧭-🧯
        [0x1F9F0, 0x1F9F4], // 🧰-🧴
        [0x1F9F5, 0x1F9F9], // 🧵-🧹
        [0x1F9FA, 0x1F9FF], // 🧺-🧿
        [0x1FA70, 0x1FA74], // 🩰-🩴
        [0x1FA75, 0x1FA77], // 🩵-🩷
        [0x1FA78, 0x1FA7C], // 🩸-🩼
        [0x1FA80, 0x1FA86], // 🪀-🪆
        [0x1FA87, 0x1FA88], // 🪇-🪈
        [0x1FA90, 0x1FA95], // 🪐-🪕
        [0x1FA96, 0x1FA9A], // 🪖-🪚
        [0x1FA9B, 0x1FAA8], // 🪛-🪨
        [0x1FAA9, 0x1FAAC], // 🪩-🪬
        [0x1FAAD, 0x1FAAF], // 🪭-🪯
        [0x1FAB0, 0x1FAB4], // 🪰-🪴
        [0x1FAB5, 0x1FAB6], // 🪵-🪶
        [0x1FAB7, 0x1FABA], // 🪷-🪺
        [0x1FABB, 0x1FABD], // 🪻-🪽
        [0x1FABF, 0x1FABF], // 🪿
        [0x1FAC0, 0x1FAC2], // 🫀-🫂
        [0x1FAC3, 0x1FAC5], // 🫃-🫅
        [0x1FACE, 0x1FACF], // 🫎-🫏
        [0x1FAD0, 0x1FAD6], // 🫐-🫖
        [0x1FAD7, 0x1FAD9], // 🫗-🫙
        [0x1FADA, 0x1FADB], // 🫚-🫛
        [0x1FAE0, 0x1FAE7], // 🫠-🫧
        [0x1FAE8, 0x1FAE8], // 🫨
        [0x1FAF0, 0x1FAF6], // 🫰-🫶
        [0x1FAF7, 0x1FAF8], // 🫷-🫸
    ];

    // Sample a random codepoint from the ranges
    function getRandomTwemojiCodepoint() {
        // Calculate total number of possible codepoints
        const totalCount = TWEMOJI_RANGES.reduce((sum, [start, end]) => 
            sum + (end - start + 1), 0
        );
        
        // Pick a random position
        let randomPos = Math.floor(Math.random() * totalCount);
        
        // Find which range it falls into
        for (const [start, end] of TWEMOJI_RANGES) {
            const rangeSize = end - start + 1;
            if (randomPos < rangeSize) {
            return start + randomPos;
            }
            randomPos -= rangeSize;
        }
        
        // Fallback (shouldn't happen)
        return 0x1F600;
    }

    // Convert codepoint to hex string (Twemoji filename format)
    function codepointToHex(codepoint) {
        return codepoint.toString(16).toLowerCase();
    }

    // Generate random Twemoji URL
    function getRandomTwemojiUrl(version = '16.0.1') {
        const codepoint = getRandomTwemojiCodepoint();
        const hex = codepointToHex(codepoint);
        return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@${version}/assets/svg/${hex}.svg`;
    }

    // Get multiple random URLs
    function getRandomTwemojiUrls(count) {
        return Array.from({ length: count }, () => getRandomTwemojiUrl());
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
                    // ns.push(I-N); // over sample neighbors other than I itself, to bias towards longer chains
                    ns.push(I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N, I-N); // over sample neighbors other than I itself, to bias towards longer chains
                }
            }

            // I is a neighbor with those left and right of it,
            // but not if they already point to I
            if (I % N !== 0   && disjoint_set[I-1] !== I){
                // ns.push(I-1);
                ns.push(I-1, I-1, I-1, I-1, I-1);
            }
            if (I % N !== N-1 && disjoint_set[I+1] !== I){
                // ns.push(I+1);
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
    function to_svg_t(grid, N, M, svgwidth, svgheight, T, R, opacity, EP, EN){
        const colors = {};
        const emojis = getRandomTwemojiUrls(EN);
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
            if (colors[grid[I][J]] !== 'transparent'){
                if (Math.random() < EP){
                    return `<polygon
                            points="${points}"
                            fill="${fill}"
                            stroke="transparent"
                            stroke-opacity="${opacity}%"
                        />
                        <image
                            href="${sample(emojis)}"
                            x="${x-width/2+width/4}"
                            y="${(I+J) % 2 === 0 ? y + height/6 : y + height/3}"
                            width="${width/2}"
                            style="opacity:${opacity}"
                        />`;
                } else {
                    return `<polygon
                            points="${points}"
                            fill="${fill}"
                            stroke="transparent"
                            stroke-opacity="${opacity}%"
                        />`;
                }
            } else {
                return "";
            }
        }
        
        const bg = colrand();
        let svg = `<svg width="${svgwidth}" height="${svgheight}" xmlns="http://www.w3.org/2000/svg" style="background: ${bg}">`;
        let layers = ["", ""];
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
          EP = parseInt(params.get("ep") ?? 0)/100,
          EN = parseInt(params.get("en") ?? 5),
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
          svg = to_svg(grid, N, M, svgwidth, svgheight, T, R, opacity, EP, EN);

    return new Response(svg, {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml"
        }
    });
}

export const config = { path: "/" };
