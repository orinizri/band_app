import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthUser, useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import loginImage from "../assets/login.png";
import registerImage from "../assets/register.png";
import WaitingForSong from "../components/rehearsal/RehearsalWaitingForSong";
import AdminDashboard from "../components/admin/AdminDashboard";
import RoleToggle from "../components/shared/RoleToggle";
import LiveDisplayWrapper from "../components/live/LiveDisplayWrapper";
import { Song } from "../types/song.type";
import { sendQuitSong } from "../utilities/utilities";
import { useLiveSong } from "../hooks/useLiveSong";

const HomePage = (): React.ReactElement => {
  const { user, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [, setError] = useState<string | null>(null);
  const liveSong = useLiveSong();
  
  const handleAuthSuccess = (user: AuthUser) => {
    // This function is called when the user successfully logs in or registers
    // Including token inside the AuthUser object
    login(user);
  };

  const onQuitSong = () => {
    // This function is called when the user quits the song
    setSelectedSong(null);
    sendQuitSong()
  }

  if (!user) {
    return (
      <AuthLayout backgroundImage={isLogin ? loginImage : registerImage}>
        {isLogin ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(false)}
            title={isAdmin ? "Admin Log In" : "Log In"}
            isAdmin={isAdmin}
          />
        ) : (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            toggleMode={() => setIsLogin(true)}
            title={isAdmin ? "Create Admin Account" : "Create Account"}
            isAdmin={isAdmin}
          />
        )}
        <RoleToggle
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isLogin={isLogin}
        />
      </AuthLayout>
    );
  }
  if (user.role === "admin")
    return (
      <AuthLayout>
        {selectedSong ? (
          <LiveDisplayWrapper
            song={selectedSong}
            user={user}
            onQuit={user.role === "admin" ? onQuitSong : undefined}
          />
        ) : (
          <AdminDashboard
            setSelectedSong={setSelectedSong}
            setError={setError}
            user={user}
          />
        )}
      </AuthLayout>
    );

  // User
  return (
    <AuthLayout>
      {liveSong ? (
        <LiveDisplayWrapper song={liveSong} user={user} onQuit={sendQuitSong} />
      ) : (
        <WaitingForSong />
      )}
    </AuthLayout>
  );
};

export default HomePage;
