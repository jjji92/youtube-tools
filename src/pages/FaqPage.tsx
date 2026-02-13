import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

const faqs = [
  {
    q: '재생목록 URL은 어디서 복사하나요?',
    a: '유튜브에서 재생목록 페이지로 이동한 후 브라우저 주소창의 URL을 복사하면 됩니다. URL에 "list=" 파라미터가 포함되어 있어야 합니다.',
  },
  {
    q: '비공개 또는 삭제된 영상은 어떻게 처리되나요?',
    a: '비공개/삭제된 영상은 재생시간 계산에서 자동으로 제외되며, 제외된 영상 수를 별도로 표시합니다.',
  },
  {
    q: '재생목록에 영상이 많으면 시간이 오래 걸리나요?',
    a: '영상 수에 따라 약간의 차이가 있지만, 수백 개 영상의 재생목록도 보통 몇 초 내에 계산됩니다.',
  },
  {
    q: '배속 계산은 정확한가요?',
    a: '총 재생시간을 배속 비율로 나눈 값입니다. 유튜브 실제 배속 재생과 동일한 결과를 보여줍니다.',
  },
  {
    q: '비공개 재생목록도 계산할 수 있나요?',
    a: '아니요, 공개 또는 일부 공개(미등록) 재생목록만 계산할 수 있습니다. 비공개 재생목록은 API로 접근할 수 없습니다.',
  },
  {
    q: '한 번에 몇 개의 영상을 합산할 수 있나요?',
    a: '영상 합산 계산기에서는 한 번에 수백 개의 영상 URL을 입력할 수 있습니다. 중복 URL은 자동으로 제거됩니다.',
  },
  {
    q: '결과를 저장하거나 공유할 수 있나요?',
    a: '"결과 복사" 버튼을 클릭하면 계산 결과가 클립보드에 복사됩니다. 메모장이나 메신저에 붙여넣어 사용하세요.',
  },
  {
    q: '무료인가요?',
    a: '네, 완전히 무료입니다. 별도의 회원가입이나 로그인 없이 바로 사용할 수 있습니다.',
  },
];

export default function FaqPage() {
  usePageMeta(
    '자주 묻는 질문 (FAQ) - 유튜브 재생시간 계산기',
    '유튜브 재생시간 계산기에 대한 자주 묻는 질문과 답변을 확인하세요.',
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">자주 묻는 질문</h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="rounded-lg border bg-white shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-slate-900 hover:bg-slate-50 transition-colors list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-4 text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-lg border bg-white shadow-sm text-center">
        <p className="text-slate-600 mb-3">다른 궁금한 점이 있으신가요?</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/guide"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            사용 가이드 보기
          </Link>
          <Link
            to="/"
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700"
          >
            계산기로 이동
          </Link>
        </div>
      </div>

      {/* FAQ 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
