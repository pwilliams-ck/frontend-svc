import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = async () => {
  return (
    <div className="mx-auto max-w-screen-2xl justify-between">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto pr-32">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
