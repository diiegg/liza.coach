import LifeCoachLandingOptimized from '@/components/LifeCoachLandingOptimized';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <LifeCoachLandingOptimized />
    </ErrorBoundary>
  );
}
