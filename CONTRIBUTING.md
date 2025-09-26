# Contributing to Surface Dashboard

Thank you for your interest in contributing to Surface Dashboard! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the [GitHub Issues](https://github.com/yourusername/surface-dashboard/issues) page
- Search existing issues before creating a new one
- Provide detailed information about the problem
- Include steps to reproduce the issue

### Suggesting Features
- Use the [GitHub Discussions](https://github.com/yourusername/surface-dashboard/discussions) page
- Describe the feature clearly
- Explain why it would be useful
- Consider implementation complexity

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Windows 10/11 (for testing)

### Setup Instructions
1. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/surface-dashboard.git
   cd surface-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm start          # Start React development server
   npm run electron   # Start Electron app
   ```

## 📋 Development Guidelines

### Code Style
- Follow React best practices
- Use functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing code formatting

### Component Structure
```javascript
// Widget Component Template
import React, { useState, useEffect } from 'react';
import './WidgetName.css';

const WidgetName = ({ data }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Component logic
  }, []);

  return (
    <div className="widget-name">
      {/* Widget content */}
    </div>
  );
};

export default WidgetName;
```

### CSS Guidelines
- Use CSS variables for theming
- Support both Dark and Light themes
- Use semantic class names
- Follow the existing naming convention
- Test on different screen sizes

### Widget Development
When creating new widgets:

1. **Create widget folder** in `src/widgets/widget-name/`
2. **Implement widget component** with React
3. **Add service file** for data handling
4. **Create IPC handlers** for Electron communication
5. **Add CSS styling** with theme support
6. **Update DashboardContext** for configuration
7. **Update SettingsModal** for widget management
8. **Add to widget exports** in `src/widgets/index.js`

### Service Structure
```javascript
// Service Template
class WidgetService {
  constructor() {
    this.data = null;
    this.updateInterval = null;
  }

  async fetchData() {
    // Data fetching logic
  }

  startMonitoring() {
    // Start real-time updates
  }

  stopMonitoring() {
    // Stop updates
  }
}

const widgetService = new WidgetService();
export default widgetService;
```

### IPC Handler Structure
```javascript
// IPC Handler Template
const setupWidgetIPC = () => {
  if (!window.electronAPI) return;

  // Register IPC handlers
  window.electronAPI.handle('widget-name:getData', async () => {
    return await widgetService.fetchData();
  });
};

export default setupWidgetIPC;
```

## 🧪 Testing

### Manual Testing
- Test all widgets in both Dark and Light themes
- Test on different screen resolutions
- Test widget enable/disable functionality
- Test dashboard switching
- Test settings persistence

### Widget Testing Checklist
- [ ] Widget renders correctly
- [ ] Data updates in real-time
- [ ] Theme colors are correct
- [ ] Responsive design works
- [ ] Error handling works
- [ ] Settings integration works

## 📝 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```
feat(widget): add smart home widget
fix(theme): correct light mode colors
docs(readme): update installation instructions
style(css): improve responsive design
refactor(dashboard): optimize widget layout
```

## 🔍 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changes are tested manually
- [ ] No console errors or warnings

### PR Description
- Describe what the PR does
- Explain why the changes are needed
- Include screenshots if UI changes
- Reference related issues
- List any breaking changes

### Review Process
- All PRs require review
- Address feedback promptly
- Keep PRs focused and small
- Update documentation as needed

## 🐛 Bug Reports

### Required Information
- **OS**: Windows version
- **Node.js**: Version number
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: Windows 10/11
- Node.js: v16.x.x
- Surface Dashboard: v1.0.0

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Use Case
Why would this feature be useful?

## Proposed Solution
How should this feature work?

## Alternatives
Any alternative solutions considered?

## Additional Context
Any other context about the feature request
```

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: your.email@example.com

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## 📄 License

By contributing to Surface Dashboard, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Surface Dashboard! 🚀
