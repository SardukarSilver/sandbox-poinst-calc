import { Layout } from "antd";

import HeaderSection from '../components/HeaderSection/HeaderSection';
import ContentSection from '../components/ContentSection/ContenSection';

function MainView() {
  return (
    <div>
      <Layout>
        <HeaderSection />
        <ContentSection />
      </Layout>
    </div>
  );
}

export default MainView;
