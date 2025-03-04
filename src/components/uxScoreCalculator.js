const calculateUXScore = (lighthouseData) => {
    if (!lighthouseData || !lighthouseData.lighthouseResult) return null;

    const { categories } = lighthouseData.lighthouseResult;
    const performance = (categories.performance?.score || 0) * 100;
    const accessibility = (categories.accessibility?.score || 0) * 100;
    const bestPractices = (categories["best-practices"]?.score || 0) * 100;
    const seo = (categories.seo?.score || 0) * 100;

    // Weighted UX Score Calculation
    const uxScore = (0.4 * performance) + (0.3 * accessibility) + (0.2 * bestPractices) + (0.1 * seo);

    return uxScore.toFixed(2);
};

export default calculateUXScore;
