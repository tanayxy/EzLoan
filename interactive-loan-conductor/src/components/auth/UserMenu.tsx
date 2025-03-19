
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User, LogOut, UserCircle, Bell, Settings, CreditCard, PieChart } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <ThemeToggle />
        <Button 
          onClick={() => navigate("/auth")} 
          variant="outline"
          className="group hover:border-bank-primary transition-all duration-300 bg-white dark:bg-transparent"
        >
          <UserCircle size={18} className="mr-2 group-hover:text-bank-primary transition-colors" />
          <span className="group-hover:text-bank-primary transition-colors">Sign In</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <ThemeToggle />
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-transform hover:scale-110"
        onClick={() => console.log("Notifications")}
      >
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-bank-primary rounded-full"></span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white hover:bg-gradient-to-r from-bank-gradient-from/5 to-bank-gradient-to/5 hover:border-bank-accent dark:bg-transparent transition-all duration-300"
          >
            <UserCircle size={18} />
            <span className="max-w-[100px] truncate">{user.user_metadata?.full_name || 'Account'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 animate-scale-in">
          <DropdownMenuLabel className="font-heading">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <PieChart className="mr-2 h-4 w-4 text-bank-primary" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <User className="mr-2 h-4 w-4 text-bank-secondary" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Settings className="mr-2 h-4 w-4 text-bank-accent" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/loan-application")} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CreditCard className="mr-2 h-4 w-4 text-bank-warning" />
            <span>Apply for Loan</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-bank-error hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
