import React, { useState } from "react";
import CompanyBanner from "./CompanyBanner";
import CompanyHeader from "./CompanyHeader";
import WidgetPanel from "./WidgetPanel";

// editingSection: 'banner' | 'header' | widget id | null
const CompanyProfileSection = ({
  mode = "display",
  bannerData: initialBannerData,
  headerData: initialHeaderData,
  widgets: initialWidgets,
}) => {
  const [editingSection, setEditingSection] = useState(null);
  const [bannerData, setBannerData] = useState(initialBannerData || {});
  const [headerData, setHeaderData] = useState(initialHeaderData || {});
  const [widgets, setWidgets] = useState(initialWidgets || []);

  const handleBannerChange = (newData) => setBannerData(newData);
  const handleHeaderChange = (newData) => setHeaderData(newData);
  const handleWidgetChange = (newWidgets) => setWidgets(newWidgets);

  return (
    <section>
      <CompanyBanner
        data={bannerData}
        mode={mode}
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        onChange={handleBannerChange}
      />
      <CompanyHeader
        data={headerData}
        mode={mode}
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        onChange={handleHeaderChange}
      />
      <WidgetPanel
        widgets={widgets}
        mode={mode}
        onChange={handleWidgetChange}
      />
    </section>
  );
};

export default CompanyProfileSection;