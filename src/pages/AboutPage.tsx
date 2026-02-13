import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

export default function AboutPage() {
  usePageMeta(
    '소개 - 유튜브 재생시간 계산기',
    '유튜브 재생시간 계산기 서비스를 소개합니다.',
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">소개</h1>

      <div className="space-y-6">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            유튜브 재생시간 계산기란?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            유튜브 재생목록이나 여러 영상의 총 재생시간을 간편하게 계산할 수 있는
            무료 온라인 도구입니다.
          </p>
          <p className="text-slate-600 leading-relaxed">
            유튜브는 재생목록의 총 시간을 공식적으로 제공하지 않습니다.
            강의 시리즈, 음악 플레이리스트, 팟캐스트 등의 총 길이를 알고 싶을 때
            이 도구를 활용하세요.
          </p>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">주요 기능</h2>
          <ul className="text-slate-600 space-y-2">
            <li className="flex gap-2">
              <span className="text-red-500 shrink-0">&#10003;</span>
              <span>재생목록 URL로 총 재생시간 계산</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 shrink-0">&#10003;</span>
              <span>1x, 1.25x, 1.5x, 1.75x, 2x 배속별 시간 확인</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 shrink-0">&#10003;</span>
              <span>여러 개별 영상의 시간 합산</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 shrink-0">&#10003;</span>
              <span>비공개/삭제 영상 자동 감지 및 표시</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 shrink-0">&#10003;</span>
              <span>결과 클립보드 복사 기능</span>
            </li>
          </ul>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            기술 정보
          </h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            YouTube Data API v3를 사용하여 정확한 영상 정보를 가져옵니다.
            개인정보 수집이나 로그인 없이 사용할 수 있습니다.
          </p>
          <p className="text-slate-600 leading-relaxed">
            본 서비스는 YouTube와 공식적인 관련이 없는 독립 서비스입니다.
          </p>
        </section>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            계산기 사용하기
          </Link>
        </div>
      </div>
    </div>
  );
}
