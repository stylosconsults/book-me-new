/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },

    webpack(config){
      config.module.rules.push({
        test:/\.svg$/,
        use: ['@svgr/webpack']
      })

      return config
    }
  }
  
module.exports = nextConfig
  