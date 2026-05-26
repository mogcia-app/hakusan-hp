const newsItems = [
  { date: "2026.05.17", category: "メニュー", title: "5/20~ご朝食メニューです" },
  { date: "2026.05.13", category: "メニュー", title: "5/13~ご朝食メニューです" },
  { date: "2026.05.04", category: "お知らせ", title: "初夏の宿泊プランを公開しました" },
];

export function NewsList() {
  return (
    <section className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_55px_rgba(56,39,20,0.08)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">News</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-900">最新情報</h2>
        </div>
        <a href="#" className="text-sm text-stone-600 transition hover:text-stone-900">
          すべて見る
        </a>
      </div>

      <div className="mt-6 divide-y divide-stone-900/10">
        {newsItems.map((item) => (
          <a
            key={`${item.date}-${item.title}`}
            href="#"
            className="flex flex-col gap-2 py-4 transition hover:opacity-70 sm:flex-row sm:items-center sm:gap-5"
          >
            <p className="w-28 text-sm text-stone-500">{item.date}</p>
            <p className="w-20 text-xs uppercase tracking-[0.24em] text-[#7e5d34]">
              {item.category}
            </p>
            <p className="text-sm text-stone-800">{item.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
