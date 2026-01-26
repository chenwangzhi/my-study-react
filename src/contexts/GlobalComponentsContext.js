import React, { createContext, useContext } from 'react';
import GlobalComponents from '../utils/globalComponents';

// 创建全局组件Context
const GlobalComponentsContext = createContext(GlobalComponents);

// Provider组件
export const GlobalComponentsProvider = ({ children }) => {
  return (
    <GlobalComponentsContext.Provider value={GlobalComponents}>
      {children}
    </GlobalComponentsContext.Provider>
  );
};

// 自定义Hook，用于获取全局组件
export const useGlobalComponents = () => {
  const context = useContext(GlobalComponentsContext);
  if (!context) {
    throw new Error('useGlobalComponents must be used within a GlobalComponentsProvider');
  }
  return context;
};

// 高阶组件，自动注入全局组件
export const withGlobalComponents = (WrappedComponent) => {
  return function WithGlobalComponentsComponent(props) {
    const globalComponents = useGlobalComponents();
    
    return (
      <WrappedComponent 
        {...props} 
        {...globalComponents}
      />
    );
  };
};

export default GlobalComponentsContext;