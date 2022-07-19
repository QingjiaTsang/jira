import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
export const AuthenticatedPage = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <div>{`${user?.name}, 你好！`}</div>
      <Button onClick={() => logout()}>登出</Button>
      <ProjectListScreen />
    </div>
  );
};
