import { defineConfig } from 'vite'

export default defineConfig({
    // server: {
    //     host: '0.0.0.0'
    // },
    // test: {
    //     globals: false,
    // },
    test: {
        globals: false,
        // Specify the directory to look for test cases
        include: ['lib/**/*.test.js'], // Adjust the pattern to match your test file naming convention
        exclude: ['node_modules', 'dist', 'src/**'], // Exclude unnecessary directories
        // Configure coverage options
        coverage: {
            // provider: 'c8', // You can use 'v8' or 'c8'
            // reportsDirectory: './coverage', // Directory for coverage reports
            include: ['lib/**/*.{js,ts}'], // Files to include in coverage calculation
            exclude: ['lib/**/*.test.{js,ts}'], // Exclude test files from coverage
        },
    },
})