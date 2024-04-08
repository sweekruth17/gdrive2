import { useSelector, useDispatch } from "react-redux";
import {
  setPath,
  setDirData,
  backPath,
} from "../redux/fileSystemSlice/fileSystemSlice";
const Navbar = () => {
  let path = useSelector((state) => state.fileSystem.path);
  const dispatch = useDispatch();
  let pathDiplay = "";
  path.map((i) => {
    pathDiplay += i + "/";
  });
  const handleBack = () => {
    if (path.length > 1) {
      let strPath = path.slice(0, path.length - 1).join("/");
      dispatch(setPath(strPath));
      dispatch(setDirData({ path: strPath }));
    }
  };
  return (
    <>
      <div className="text-xl px-2 py-2 flex gap-x-4">
        <button className="ml-2 " onClick={handleBack}>
          <img className="" src="assets/arrow_back.png" alt="back" />
        </button>{" "}
        <div className="mb-1 cursor-pointer"> {pathDiplay}</div>
      </div>
      <div className="bg-slate-200 h-[1px] w-full"></div>
    </>
  );
};

export default Navbar;
