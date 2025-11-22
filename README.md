# partitions

[![Netlify Status](https://api.netlify.com/api/v1/badges/882d6aa1-446b-4875-9421-7282eed48b5b/deploy-status)](https://app.netlify.com/projects/courageous-pasca-c65b8f/deploys)

This app is hosted on Netlify:

https://courageous-pasca-c65b8f.netlify.app/

It generates SVGs of random partitionings of a space. For example:

![](https://courageous-pasca-c65b8f.netlify.app/)

## url parameters

It accepts the following URL parameters:

- `w` and `h`: The width and height of the generated SVG, respectively. Default: 1000 by 1000.
- `s`: The size of the squares in the grid. Default: 20.
- `o`: The opacity of the squares in the grid, from 0 to 100. Default: 90.
- `t`: The percent of the partitions to make transparent, from 0 to 100. Default: 20.
- `r`: The maximum amount to randomly shift squares' positions by. Default: 20.
- `p`: The pattern to draw, s or t. Default: s.

## run locally

```sh
npm install
npx netlify dev
```

## examples

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=0&r=10&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=0&r=10&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=50&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=50&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=100&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=100&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=150&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=150&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=200&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=200&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=400&s=50&t=0&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=400&s=50&t=0&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=50&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=50&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=90&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=90&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=5&t=95&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=5&t=95&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=200&t=50&r=0&o=100`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=200&t=50&r=0&o=100)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=200&t=50&r=20&o=50`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=200&t=50&r=20&o=50)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=25&t=95&r=50&o=90`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=25&t=95&r=50&o=90)

`https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=95&r=0&o=100&p=t`

![](https://courageous-pasca-c65b8f.netlify.app/?w=1600&h=900&s=50&t=95&r=0&o=100&p=t)
