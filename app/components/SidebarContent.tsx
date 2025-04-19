function SidebarContent({
    items,
    pathname,
    isSidebarOpen,
    setSidebarOpen,
    isProdukOpen,
    setProdukOpen,
    user,
    handleLogout,
  }: {
    items: SidebarItemType
    pathname: string;
    isSidebarOpen: boolean;
    setSidebarOpen: (val: boolean) => void;
    isProdukOpen: boolean;
    setProdukOpen: (val: boolean) => void;
    user: User | null;
    handleLogout: () => void;
  }) {
    return (
      <div
        className={clsx(
          "bg-white h-full shadow-md flex flex-col justify-between duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <Image src="/assets/logo.png" alt="Logo" width={24} height={24} />
          <div
            className="relative w-6 h-6 cursor-pointer"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu
              className={clsx(
                "absolute transition-all duration-300",
                isSidebarOpen
                  ? "opacity-0 scale-90 rotate-45"
                  : "opacity-100 scale-100 rotate-0"
              )}
            />
            <X
              className={clsx(
                "absolute transition-all duration-300",
                isSidebarOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-90 -rotate-45"
              )}
            />
          </div>
        </div>
  
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-4">
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                text={item.text}
                href={item.href}
                isActive={pathname === item.href}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
  
            {/* Submenu */}
            <li>
              <button
                onClick={() => setProdukOpen(!isProdukOpen)}
                className={clsx(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <span className="flex items-center gap-3">
                  <Store size={20} />
                  {isSidebarOpen && <span>Toko</span>}
                </span>
                {isSidebarOpen &&
                  (isProdukOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  ))}
              </button>
  
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300 ml-9 mt-1 space-y-1 text-sm text-gray-600",
                  isProdukOpen ? "max-h-40" : "max-h-0"
                )}
              >
                <LinkItem
                  href="/produk"
                  pathname={pathname}
                  label="Daftar Produk"
                />
                <LinkItem
                  href="/produk/tambah"
                  pathname={pathname}
                  label="Tambah Produk"
                />
              </div>
            </li>
          </ul>
        </nav>
  
        {/* Footer */}
        <div className="px-4 py-4 bg-gray-100 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-2">
            <Image
              src={user?.image || "/assets/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            )}
          </div>
          <LogOut
            size={20}
            className="text-gray-700 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    );
  }
  