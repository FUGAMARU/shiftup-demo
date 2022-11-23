/** @type {import('next').NextConfig} */

const withInterceptStdout = require("next-intercept-stdout")

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
}

module.exports = withInterceptStdout(nextConfig, (text) => (text.includes("Duplicate atom key") ? "" : text))
