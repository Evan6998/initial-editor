import React, { useState } from "react";
import PropTypes from "prop-types";
import SummaryWidget from "../widgets/SummaryWidget";
import DescriptionWidget from "../widgets/DescriptionWidget";

const WIDGET_TEMPLATES = [
  {
    type: "summary",
    name: "Summary",
    description: "Summary of the company",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-blue-500"><rect x="4" y="6" width="16" height="4" rx="2" fill="currentColor"/><rect x="4" y="14" width="10" height="2" rx="1" fill="currentColor" opacity=".3"/></svg>
    ),
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
  {
    type: "description",
    name: "Description",
    description: "A detailed company description",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-blue-500"><rect x="4" y="6" width="16" height="4" rx="2" fill="currentColor"/><rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" opacity=".5"/><rect x="4" y="14" width="16" height="4" rx="2" fill="currentColor" opacity=".2"/></svg>
    ),
    component: DescriptionWidget,
    editable: true,
    defaultData: {
      description: "DICK'S Sporting Goods, Inc., together with its subsidiaries, operates as a sporting goods retailer..."
    },
  },
  // Add more templates here as needed
];

const WidgetTemplateModal = ({ templates, onSelect, onClose }) => {
  const [search, setSearch] = useState("");

  // Filter templates by search query (name or description)
  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-2xl shadow-lg min-w-[400px] max-w-[480px] w-full">
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-3xl font-bold mb-6">New Widget</h2>
          <input
            className="w-full mb-6 px-4 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Search Widgets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <div className="pb-4 max-h-[340px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No widgets found.</div>
            ) : (
              filtered.map(t => (
                <button
                  key={t.type}
                  className="flex items-center w-full text-left px-4 py-4 mb-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition group shadow-sm"
                  onClick={() => onSelect(t)}
                >
                  <div className="flex-shrink-0 mr-4">{t.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-gray-900 group-hover:text-blue-700">{t.name}</div>
                    <div className="text-gray-500 text-sm mt-1">{t.description}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
        <div className="px-8 pb-6 flex justify-start">
          <button
            className="text-blue-500 hover:underline text-base font-medium mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

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
      description: PropTypes.string.isRequired,
      icon: PropTypes.node,
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
