import { useSelector, useDispatch } from "react-redux";
import { setDirData, setPath } from "../redux/fileSystemSlice/fileSystemSlice";
const Folder = ({ item, currentDir, setCurrentDir }) => {
  const { id, name, path, type } = item;
  // console.log(item);
  const dispatch = useDispatch();
  let clicks = [];
  let timeout;
  const handleClick = (event) => {
    event.preventDefault();
    clicks.push(new Date().getTime());
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      if (
        clicks.length >= 1 &&
        clicks[clicks.length - 1] - clicks[clicks.length - 2] <= 300
      ) {
        console.log("double clicked");
        dispatch(setDirData({ path, name }));
        dispatch(setPath(path));
        clicks = [];
      } else {
        clicks = [];
      }
    }, 250);
  };
  return (
    <div className="pt-8 mx-6">
      <button onClick={handleClick}>
        {" "}
        <img src="/assets/folder.png" alt="" />
        {name}
      </button>
    </div>
  );
};

export default Folder;
