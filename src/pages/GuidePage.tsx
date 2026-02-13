import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

export default function GuidePage() {
  usePageMeta(
    '사용 가이드 - 유튜브 재생시간 계산기',
    '유튜브 재생목록 시간 계산기와 영상 합산 계산기 사용 방법을 안내합니다.',
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">사용 가이드</h1>

      <div className="space-y-8">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            1. 재생목록 시간 계산하기
          </h2>
          <ol className="text-slate-600 space-y-3 list-decimal list-inside">
            <li>
              유튜브에서 원하는 재생목록 페이지로 이동합니다.
              <p className="text-sm text-slate-400 ml-5 mt-1">
                URL이 <code className="bg-slate-100 px-1 rounded">youtube.com/playlist?list=...</code> 형태인지 확인하세요.
              </p>
            </li>
            <li>주소창의 URL을 복사합니다. (Ctrl+L → Ctrl+C)</li>
            <li>
              <Link to="/" className="text-red-600 hover:underline">재생목록 계산기</Link>에 붙여넣고 &quot;계산하기&quot;를 클릭합니다.
            </li>
            <li>총 재생시간, 배속별 시간, 영상 목록이 표시됩니다.</li>
          </ol>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            2. 여러 영상 시간 합산하기
          </h2>
          <ol className="text-slate-600 space-y-3 list-decimal list-inside">
            <li>합산하고 싶은 각 영상의 URL을 복사합니다.</li>
            <li>
              <Link to="/multi" className="text-red-600 hover:underline">영상 합산 계산기</Link>에 URL을 한 줄에 하나씩 입력합니다.
            </li>
            <li>&quot;합산 계산하기&quot;를 클릭합니다.</li>
            <li>전체 합산 시간과 배속별 시간이 표시됩니다.</li>
          </ol>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            지원하는 URL 형식
          </h2>
          <div className="space-y-2 text-sm font-mono text-slate-600">
            <p className="text-base font-sans font-medium text-slate-700 mb-3">재생목록:</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/playlist?list=PLxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/watch?v=xxx&list=PLxxxxxx</p>

            <p className="text-base font-sans font-medium text-slate-700 mt-4 mb-3">개별 영상:</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/watch?v=xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://youtu.be/xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/shorts/xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/embed/xxxxxxxxxxx</p>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            배속 계산 설명
          </h2>
          <p className="text-slate-600 mb-3">
            유튜브는 0.25x ~ 2x 배속을 지원합니다. 가장 많이 사용되는 5가지 배속의 시간을 표시합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4 text-slate-500">배속</th>
                  <th className="py-2 text-slate-500">1시간 영상 기준</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b"><td className="py-2 pr-4">1x</td><td>60분</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.25x</td><td>48분</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.5x</td><td>40분</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.75x</td><td>약 34분</td></tr>
                <tr><td className="py-2 pr-4">2x</td><td>30분</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
