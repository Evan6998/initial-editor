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

  const handleEdit = (section) => setEditingSection(section);
  const handleSave = () => setEditingSection(null);

  const handleBannerChange = (newData) => setBannerData(newData);
  const handleHeaderChange = (newData) => setHeaderData(newData);

  return (
    <section>
      <CompanyBanner
        data={bannerData}
        mode={mode}
        editing={editingSection === "banner"}
        onEdit={() => handleEdit("banner")}
        onSave={handleSave}
        onChange={handleBannerChange}
        disableEdit={editingSection !== null && editingSection !== "banner"}
      />
      <CompanyHeader
        data={headerData}
        mode={mode}
        editing={editingSection === "header"}
        onEdit={() => handleEdit("header")}
        onSave={handleSave}
        onChange={handleHeaderChange}
        disableEdit={editingSection !== null && editingSection !== "header"}
      />
      <WidgetPanel
        widgets={widgets}
        mode={mode}
        editingWidgetId={typeof editingSection === "number" ? editingSection : null}
        onEditWidget={id => handleEdit(id)}
        onSaveWidget={handleSave}
        disableEdit={editingSection !== null && typeof editingSection !== "number"}
      />
    </section>
  );
};

export default CompanyProfileSection;