import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SummaryWidget from "../widgets/SummaryWidget";

const WIDGET_TEMPLATES = [
  {
    type: "summary",
    name: "Summary",
    component: SummaryWidget,
    editable: true,
    defaultData: {
      location: "Coraopolis, PA",
      website: "https://www.dickssportinggoods.com",
      sector: "Consumer Discretionary",
      industry: "Specialty Retail",
      employees: "18.9K",
      ipoDate: "2002-10-16",
      careersUrl: "#",
      financialUrl: "#",
    },
  },
];

const WidgetTemplateModal = ({ templates, onSelect, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px]">
      <h3 className="text-lg font-semibold mb-4">Select a Widget Template</h3>
      <ul>
        {templates.map((template) => (
          <li key={template.type} className="mb-2">
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => onSelect(template)}
            >
              {template.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  </div>
);

const WidgetActions = ({ isEditing, onEdit, onSave, onDelete }) => (
  <>
    {!isEditing && (
      <button
        onClick={onEdit}
        className="absolute top-2 right-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
        title="Edit Widget"
      >
        ✎
      </button>
    )}
    {isEditing && (
      <button
        onClick={onSave}
        className="absolute top-2 right-12 bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
        title="Save Widget"
      >
        ✓
      </button>
    )}
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
      title="Delete Widget"
    >
      &times;
    </button>
  </>
);

const WidgetPanel = ({ 
  widgets: initialWidgets, 
  mode = "editor",
  editingWidgetId,
  onEditWidget,
  onSaveWidget,
  onWidgetsChange,
  disableEdit = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [localWidgets, setLocalWidgets] = useState(initialWidgets);

  // Update local widgets when props change
  useEffect(() => {
    setLocalWidgets(initialWidgets);
  }, [initialWidgets]);

  // Notify parent of widget changes
  useEffect(() => {
    if (onWidgetsChange) {
      onWidgetsChange(localWidgets);
    }
  }, [localWidgets, onWidgetsChange]);

  const handleSelectTemplate = (template) => {
    const newWidget = {
      id: Date.now(),
      type: template.type,
      data: template.defaultData,
      position: localWidgets.length, // Add position based on current length
    };
    setLocalWidgets([...localWidgets, newWidget]);
    setShowModal(false);
  };

  const handleDeleteWidget = (id) => {
    const updatedWidgets = localWidgets
      .filter((widget) => widget.id !== id)
      .map((widget, index) => ({
        ...widget,
        position: index, // Update positions after deletion
      }));
    setLocalWidgets(updatedWidgets);
    if (editingWidgetId === id) onEditWidget(null);
  };

  const handleWidgetChange = (id, newData) => {
    setLocalWidgets(localWidgets.map(widget => 
      widget.id === id ? { ...widget, data: newData } : widget
    ));
  };

  const renderWidget = (widget) => {
    const template = WIDGET_TEMPLATES.find((t) => t.type === widget.type);
    if (!template) return null;

    const WidgetComponent = template.component;
    const isEditable = template.editable && mode === "editor";
    const isEditing = editingWidgetId === widget.id;

    return (
      <div key={widget.id} className="relative mb-4 w-full">
        <WidgetComponent
          data={widget.data}
          editable={isEditable && isEditing}
          mode={mode}
          editing={isEditing}
          onChange={isEditable && isEditing ? (newData) => handleWidgetChange(widget.id, newData) : undefined}
          onEdit={isEditable && !isEditing ? () => onEditWidget(widget.id) : undefined}
          onSave={isEditable && isEditing ? onSaveWidget : undefined}
        />
        {isEditable && (
          <WidgetActions
            isEditing={isEditing}
            onEdit={() => onEditWidget(widget.id)}
            onSave={onSaveWidget}
            onDelete={() => handleDeleteWidget(widget.id)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center mb-6">
      {localWidgets.length === 0 ? (
        <p className="text-gray-400">No widgets yet. Add one to get started!</p>
      ) : (
        localWidgets.map(renderWidget)
      )}
      {mode === "editor" && !disableEdit && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          + Add Widget
        </button>
      )}
      {showModal && (
        <WidgetTemplateModal
          templates={WIDGET_TEMPLATES}
          onSelect={handleSelectTemplate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

WidgetPanel.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      data: PropTypes.object.isRequired,
      position: PropTypes.number,
    })
  ).isRequired,
  mode: PropTypes.oneOf(["editor", "display"]),
  editingWidgetId: PropTypes.number,
  onEditWidget: PropTypes.func.isRequired,
  onSaveWidget: PropTypes.func.isRequired,
  onWidgetsChange: PropTypes.func,
  disableEdit: PropTypes.bool,
};

WidgetTemplateModal.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
      editable: PropTypes.bool.isRequired,
      defaultData: PropTypes.object.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

WidgetActions.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WidgetPanel;
