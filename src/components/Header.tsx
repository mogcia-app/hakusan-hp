const navItems = [
  { href: "/guide", label: "総合案内" },
  { href: "#rooms", label: "客室案内" },
  { href: "#access", label: "交通アクセス" },
  { href: "/faq", label: "よくある質問" },
];

export function Header() {
  return (
    <header className="w-full border-b border-stone-900/10 bg-white">
      <div className="flex w-full items-center px-6 py-5 lg:px-10">
        <div className="text-sm text-stone-500">ここに画像</div>
        <div className="ml-auto">
          <nav className="flex items-center gap-6 whitespace-nowrap text-sm text-stone-800 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-block pb-1 decoration-stone-900 decoration-[1px] underline-offset-4 transition hover:text-stone-950 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
