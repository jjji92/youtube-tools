import { usePageMeta } from '../utils/usePageMeta';

export default function TermsPage() {
  usePageMeta(
    '이용약관 - 유튜브 재생시간 계산기',
    '유튜브 재생시간 계산기의 이용약관입니다.',
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">이용약관</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-6 text-slate-600 leading-relaxed">
        <p>시행일: 2026년 2월 13일</p>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            1. 서비스 개요
          </h2>
          <p>
            유튜브 재생시간 계산기(이하 &quot;서비스&quot;)는 유튜브 재생목록 및
            영상의 재생시간을 계산하는 무료 온라인 도구입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            2. 서비스 이용
          </h2>
          <p>
            본 서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수 있습니다.
            서비스는 YouTube Data API를 통해 공개된 정보만 사용합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            3. 면책 사항
          </h2>
          <p>
            서비스에서 제공하는 계산 결과는 참고용이며, YouTube의 실제 재생시간과
            약간의 차이가 발생할 수 있습니다. 서비스 운영자는 계산 결과의 정확성에
            대해 보증하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            4. 지적 재산권
          </h2>
          <p>
            본 서비스는 YouTube와 공식적으로 관련이 없는 독립 서비스입니다.
            YouTube 및 관련 상표는 Google LLC의 자산입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            5. 서비스 변경 및 중단
          </h2>
          <p>
            서비스 운영자는 사전 통지 없이 서비스를 변경하거나 중단할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            6. 약관 변경
          </h2>
          <p>
            본 약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지에 게시합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
