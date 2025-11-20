const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["www.cryptocompare.com", "lh3.googleusercontent.com"], // Add allowed domains here
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
  async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "rune-vault.vercel.app",
					},
				],
				destination: "https://runevault.smoggyowo.tech/:path*",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
