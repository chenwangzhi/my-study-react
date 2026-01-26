# Sass样式组织结构

## 文件结构
```
src/styles/
├── _variables.scss    # 全局变量定义
├── _mixins.scss      # 全局mixins和函数
├── main.scss         # 主样式文件，导入所有模块
└── README.md         # 说明文档
```

## 使用方法

### 1. 变量使用
在任何SCSS文件中使用预定义的变量：
```scss
.my-component {
  color: $primary-color;
  padding: $spacing-md;
  border-radius: $border-radius-md;
}
```

### 2. Mixins使用
使用预定义的mixins：
```scss
.my-button {
  @include button-base($primary-color);
}

.my-card {
  @include card;
}

.centered-content {
  @include flex-center;
}
```

### 3. 响应式设计
使用响应式mixins：
```scss
.my-component {
  font-size: $font-size-lg;
  
  @include mobile {
    font-size: $font-size-base;
  }
  
  @include tablet {
    font-size: $font-size-lg;
  }
}
```

### 4. 组件样式
每个组件应该有自己的SCSS文件：
```scss
// components/MyComponent/MyComponent.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.my-component {
  @include card;
  
  &__title {
    color: $primary-color;
    font-size: $font-size-xl;
  }
  
  &__button {
    @include button-base($secondary-color);
  }
}
```

## 最佳实践

1. **变量命名**: 使用语义化的变量名，如 `$primary-color` 而不是 `$blue`
2. **嵌套深度**: 避免超过3层的嵌套
3. **Mixins**: 将重复的样式模式提取为mixins
4. **模块化**: 每个组件有独立的SCSS文件
5. **导入顺序**: 先导入变量，再导入mixins，最后是组件样式