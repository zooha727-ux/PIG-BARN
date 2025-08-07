import { useEffect } from 'react';
import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // 앱 시작 시 로그인 화면으로 리다이렉트
    router.replace('/login');
  }, []);

  return null;
}