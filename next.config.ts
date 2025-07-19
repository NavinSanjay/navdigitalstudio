import withMDX from '@next/mdx'

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    // Optional: you can add remark/rehype plugins here
  },
})

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'], // important to support .mdx pages
}

export default withMDXConfig(nextConfig)
