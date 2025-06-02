import React, { useState } from "react";
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

const InsertionPoint = ({ onClick }) => (
  <div
    className="relative my-4 w-full flex items-center justify-center cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-center w-full px-1 opacity-30 group-hover:opacity-100 transition-opacity">
      {/* left dashed line */}
      <div
        className="flex-1 h-[2px]"                  // total height: 2 px
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right,rgb(159, 214, 179) 0 20px, transparent 20px 28px)',
        }}
      />
      {/* plus button */}
      <div className="mx-3 w-7 h-7 z-10 bg-green-500 group-hover:bg-green-600 rounded-full flex items-center justify-center shadow-md">
        <span className="text-white text-lg font-bold leading-none">+</span>
      </div>
      {/* right dashed line */}
      <div
        className="flex-1 h-[2px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgb(159, 214, 179) 0 20px, transparent 20px 28px)',
        }}
      />
    </div>
  </div>
);

const WidgetPanel = ({ widgets, mode = "editor", onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingWidgetId, setEditingWidgetId] = useState(null);
  const [insertPosition, setInsertPosition] = useState(null);

  const handleSelectTemplate = (template) => {
    const newWidget = {
      id: Date.now(),
      type: template.type,
      data: template.defaultData,
    };
    
    if (insertPosition === null) {
      // Append to the end
      onChange([...widgets, newWidget]);
    } else {
      // Insert at specific position
      const newWidgets = [...widgets];
      newWidgets.splice(insertPosition, 0, newWidget);
      onChange(newWidgets);
    }
    
    setShowModal(false);
    setInsertPosition(null);
  };

  const handleDeleteWidget = (id) => {
    onChange(widgets.filter((widget) => widget.id !== id));
    if (editingWidgetId === id) setEditingWidgetId(null);
  };

  const handleWidgetChange = (id, newData) => {
    onChange(widgets.map(widget => 
      widget.id === id ? { ...widget, data: newData } : widget
    ));
  };

  const renderWidget = (widget, index) => {
    const template = WIDGET_TEMPLATES.find((t) => t.type === widget.type);
    if (!template) return null;

    const WidgetComponent = template.component;
    const isEditable = template.editable && mode === "editor";
    const isEditing = editingWidgetId === widget.id;

    return (
      <React.Fragment key={widget.id}>
        {mode === "editor" && (
          <InsertionPoint 
            onClick={() => {
              setInsertPosition(index);
              setShowModal(true);
            }}
          />
        )}
        <div className="relative mb-4 w-full">
          <WidgetComponent
            data={widget.data}
            editable={isEditable && isEditing}
            mode={mode}
            editing={isEditing}
            onChange={isEditable && isEditing ? (newData) => handleWidgetChange(widget.id, newData) : undefined}
            onEdit={isEditable && !isEditing ? () => setEditingWidgetId(widget.id) : undefined}
            onSave={isEditable && isEditing ? () => setEditingWidgetId(null) : undefined}
          />
          {isEditable && (
            <WidgetActions
              isEditing={isEditing}
              onEdit={() => setEditingWidgetId(widget.id)}
              onSave={() => setEditingWidgetId(null)}
              onDelete={() => handleDeleteWidget(widget.id)}
            />
          )}
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center mb-6">
      {mode === "editor" && widgets.length === 0 ? (
        <InsertionPoint 
          onClick={() => {
            setInsertPosition(null);
            setShowModal(true);
          }}
        />
      ) : (
        <>
          {widgets.map(renderWidget)}
          {mode === "editor" && (
            <InsertionPoint 
              onClick={() => {
                setInsertPosition(null);
                setShowModal(true);
              }}
            />
          )}
        </>
      )}
      {showModal && (
        <WidgetTemplateModal
          templates={WIDGET_TEMPLATES}
          onSelect={handleSelectTemplate}
          onClose={() => {
            setShowModal(false);
            setInsertPosition(null);
          }}
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
    })
  ).isRequired,
  mode: PropTypes.oneOf(["editor", "display"]),
  onChange: PropTypes.func.isRequired,
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
