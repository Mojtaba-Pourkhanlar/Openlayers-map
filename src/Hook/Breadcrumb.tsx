import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname
    .split("/")
    .filter((path) => path && path !== "admin" && path !== "project");

  const pathNames: { [key: string]: string } = {
    projectlist: "لیست پروژه‌ها",
  };

  return (
    <nav style={{ margin: "16px 0" }}>
      {paths.map((path, index) => {
        const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
        const isCurrentPath = `/admin/project${fullPath}` === location.pathname;
        return (
          <span key={index}>
            <span
              onClick={() => !isCurrentPath && navigate(fullPath)}
              style={{
                cursor: isCurrentPath ? "default" : "pointer",
                color: "#0B233F",
                userSelect: "none",
              }}
            >
              {pathNames[path] || decodeURIComponent(path)}
            </span>
            {index < paths.length - 1 && (
              <span style={{ margin: "0 8px", color: "#0B233F" }}>{" > "}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
