import { usePageMeta } from '../utils/usePageMeta';

export default function PrivacyPage() {
  usePageMeta(
    '개인정보처리방침 - 유튜브 재생시간 계산기',
    '유튜브 재생시간 계산기의 개인정보처리방침입니다.',
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">개인정보처리방침</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-6 text-slate-600 leading-relaxed">
        <p>시행일: 2026년 2월 13일</p>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            1. 수집하는 개인정보
          </h2>
          <p>
            본 서비스는 회원가입이나 로그인 없이 사용 가능하며, 별도의 개인정보를
            수집하지 않습니다. 사용자가 입력하는 유튜브 URL은 서버에 저장되지 않으며,
            YouTube API 호출에만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            2. 쿠키 및 분석 도구
          </h2>
          <p>
            서비스 개선을 위해 Google Analytics를 사용하여 방문자 통계를 수집할 수
            있습니다. 이는 익명 데이터이며 개인을 식별하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            3. 제3자 서비스
          </h2>
          <p>
            본 서비스는 YouTube Data API v3를 사용합니다. YouTube API 사용 시
            Google의{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              개인정보 처리방침
            </a>
            이 적용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            4. 데이터 보관
          </h2>
          <p>
            사용자가 입력한 URL과 계산 결과는 브라우저에서만 처리되며, 서버에
            저장되지 않습니다. 브라우저를 닫으면 모든 데이터가 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            5. 방침 변경
          </h2>
          <p>
            본 방침은 법률 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시
            본 페이지에 게시합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
