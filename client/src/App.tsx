import { MainLayout, SectionContainer } from './components';
import { SectionIdEnum } from './types';
import { AboutSection } from './sections';

const sections = [
  {
    sectionId: SectionIdEnum.about,
    component: <AboutSection />,
  },
  {
    sectionId: SectionIdEnum.FAQ,
    component: <AboutSection />,
  },
  {
    sectionId: SectionIdEnum.pricing,
    component: <AboutSection />,
  },
];

export const App: React.FC = () => {
  return (
    <MainLayout>
      {sections.map(({ component, sectionId }) => {
        return (
          <SectionContainer sectionId={sectionId} key={sectionId}>
            {component}
          </SectionContainer>
        );
      })}
    </MainLayout>
  );
};