import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Github 레포지토리 이름이 'wedding-invitation'일 경우 아래와 같이 설정
  // root 도메인(username.github.io)을 사용할 경우 base: '/' 로 설정
  base: '/wedding-invitation/',
});
