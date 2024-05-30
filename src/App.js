import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ConnectionLineType,
} from 'react-flow-renderer';

import NodesPanel from './Components/NodesPanel';
import SettingsPanel from './Components/SettingsPanel';
import Node from './Components/Node'; // Import custom Node component
import './styles.css';

// Define nodeTypes outside the component to avoid recreating it on each render
const nodeTypes = {
  custom: ({ data }) => <Node text_msg={data.label} />,
};

const initialNodes = [];
const initialEdges = [];

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [workFlowState, setworkFlowState] = useState("success"); // State for error message

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            markerEnd: {
              type: MarkerType.Arrow,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onElementClick = useCallback(
    (event, element) => {
      if (element.type === 'custom') {
        setSelectedNode(element);
      }
    },
    [setSelectedNode]
  );

  const addNode = useCallback(
    (type) => {
      const newNode = {
        id: `${type}-${nodes.length}`,
        data: { label: `${type} Node` },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        type: 'custom',
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const updateNodeText = useCallback(
    (id, text) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label: text } } : node))
      );
    },
    [setNodes]
  );

  const saveFlow = useCallback(() => {
    const errors = nodes.filter((node) => node.type === 'custom' && !edges.find((edge) => edge.target === node.id));
    if (errors.length > 1) {
      setErrorMessage('Can not save workflow.');
      setworkFlowState('error');
    } else {
      // console.log('Flow saved:', nodes, edges);
      setErrorMessage("Flow saved successfully!'"); // Clear error message on successful save
      setworkFlowState('success');
      // alert('Flow saved successfully!');
    }
  }, [nodes, edges]);

  return (
    <div className="dndflow">
      <div className="wf-header">
        {errorMessage && <div className={`error-message ${workFlowState}`}>{errorMessage}</div>} {/* Display error message */}
        <button className="save-btn" onClick={saveFlow}>Save Flow</button>
      </div>
      <div className="wf-body">
        <div className="reactflow-wrapper" style={{ height: 600 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onElementClick}
            onEdgeClick={onElementClick}
            nodeTypes={nodeTypes} // Use memoized or statically defined nodeTypes
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {selectedNode ? (
          <SettingsPanel node={selectedNode} updateNodeText={updateNodeText} />
        ) : (
          <NodesPanel addNode={addNode} />
        )}
      </div>
    </div>
  );
};

export default App;
