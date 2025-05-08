// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       '/api': {
// //         target: 'http://localhost:8000',
// //         changeOrigin: true,
// //         secure: false,
// //       }
// //     }
// //   }
// // })


// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd())

//   return {
//     plugins: [react()],
//     server: {
//       proxy: {
//         '/api': {
//           target: env.VITE_API_BASE_URL,
//           changeOrigin: true,
//           secure: false,
//         }
//       }
//     },
//     preview: {
//       host: '0.0.0.0',
//       port: 5173,
//       allowedHosts: ['*', env.VITE_HOST_FRONTEND]
//     },

//     build: {
//       outDir: 'dist',
//       sourcemap: false, // Tắt sourcemap trong sản xuất để giảm kích thước
//     },
//   }
// })




import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("Env from vite.config.js:", env); // In tất cả biến môi trường
  console.log("VITE_API_URL:", env.VITE_API_URL); // In riêng VITE_API_URL
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Đảm bảo server lắng nghe trên tất cả các interface
      port: 5173,
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API_BASE_URL,
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },
    // preview: {
    //   host: '0.0.0.0',
    //   port: 5173,
    // },
    build: {
      outDir: 'dist',
      sourcemap: false, // Tắt sourcemap để giảm kích thước và bảo mật
      minify: 'esbuild', // Sử dụng esbuild để tối ưu hóa kích thước bundle
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'], // Tách các thư viện lớn thành chunk riêng
          },
        },
      },
    },
  };
});