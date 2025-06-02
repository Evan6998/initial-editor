import React, { useState } from "react";
import CompanyBanner from "./CompanyBanner";
import CompanyHeader from "./CompanyHeader";
import WidgetPanel from "./WidgetPanel";

// This component is a presentational wrapper for the company profile section.
// It receives all data and mode as props and passes them to its children.
const CompanyProfileSection = ({
  mode = "display",
  bannerData,
  headerData,
  widgets,
}) => {
  const [editingSection, setEditingSection] = useState(null);

  const handleEdit = (section) => setEditingSection(section);
  const handleSave = () => setEditingSection(null);

  return (
    <section>
      <CompanyBanner
        data={bannerData}
        mode={mode}
        editing={editingSection === "banner"}
        onEdit={() => handleEdit("banner")}
        onSave={handleSave}
        disableEdit={editingSection !== null && editingSection !== "banner"}
      />
      <CompanyHeader
        data={headerData}
        mode={mode}
        editing={editingSection === "header"}
        onEdit={() => handleEdit("header")}
        onSave={handleSave}
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