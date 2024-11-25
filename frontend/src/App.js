import { memo } from "react";
import Layout from "./layout/Layout";

const MemoizedLayout = memo(Layout);

function App() {
  return <MemoizedLayout />;
}

export default App;
