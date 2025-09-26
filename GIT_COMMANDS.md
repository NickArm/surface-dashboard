# Git Commands for Surface Dashboard

## 🚀 Initial Setup

### Create Repository
```bash
# Initialize Git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "feat: initial commit - Surface Dashboard v1.0.0"

# Add remote origin
git remote add origin https://github.com/NickArm/surface-dashboard.git

# Push to GitHub
git push -u origin main
```

## 📝 Daily Workflow

### Check Status
```bash
# Check repository status
git status

# Check differences
git diff

# Check staged changes
git diff --cached
```

### Add Changes
```bash
# Add specific files
git add src/components/ResponsiveDashboard.js
git add src/widgets/hardware/HardwareMonitorWidget.css

# Add all changes
git add .

# Add with interactive mode
git add -i
```

### Commit Changes
```bash
# Commit with message
git commit -m "feat(widget): add smart home integration"

# Commit with detailed message
git commit -m "feat(widget): add smart home integration

- Add Tapo device support
- Implement Xiaomi Home integration
- Add device discovery functionality
- Update widget management system

Closes #123"
```

### Push Changes
```bash
# Push to current branch
git push

# Push to specific branch
git push origin feature/smart-home

# Force push (use with caution)
git push --force-with-lease
```

## 🌿 Branch Management

### Create Branches
```bash
# Create and switch to new branch
git checkout -b feature/smart-home-widget

# Create branch from specific commit
git checkout -b hotfix/bug-fix abc1234

# Create branch from remote
git checkout -b feature/new-widget origin/develop
```

### Switch Branches
```bash
# Switch to branch
git checkout main
git checkout feature/smart-home

# Switch to previous branch
git checkout -

# Switch to remote branch
git checkout -b local-branch origin/remote-branch
```

### Merge Branches
```bash
# Merge feature branch to main
git checkout main
git merge feature/smart-home

# Merge with no-fast-forward
git merge --no-ff feature/smart-home

# Merge with squash
git merge --squash feature/smart-home
```

### Delete Branches
```bash
# Delete local branch
git branch -d feature/smart-home

# Force delete local branch
git branch -D feature/smart-home

# Delete remote branch
git push origin --delete feature/smart-home
```

## 🔄 Pull Requests

### Create Pull Request
```bash
# Push feature branch
git push origin feature/smart-home

# Then create PR on GitHub
# Or use GitHub CLI
gh pr create --title "Add Smart Home Widget" --body "Description of changes"
```

### Update Pull Request
```bash
# Add more commits to PR branch
git add .
git commit -m "fix: resolve device connection issues"
git push origin feature/smart-home
```

## 🏷️ Tagging

### Create Tags
```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Create tag for specific commit
git tag -a v1.0.0 abc1234
```

### Push Tags
```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

## 🔍 History and Logs

### View History
```bash
# View commit history
git log

# View with graph
git log --graph --oneline --all

# View specific file history
git log -- src/components/ResponsiveDashboard.js

# View changes in commits
git log -p
```

### Search History
```bash
# Search commit messages
git log --grep="smart home"

# Search code changes
git log -S "TapoService"

# Search by author
git log --author="yourname"
```

## 🔧 Configuration

### User Configuration
```bash
# Set global user name
git config --global user.name "Nick Armenis"

# Set global user email
git config --global user.email "armenisnick@gmail.com"

# Set local user (for this repo only)
git config user.name "Nick Armenis"
git config user.email "armenisnick@gmail.com"
```

### Repository Configuration
```bash
# Set default branch
git config init.defaultBranch main

# Set pull strategy
git config pull.rebase false

# Set editor
git config core.editor "code --wait"
```

## 🚨 Troubleshooting

### Undo Changes
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit
git revert abc1234

# Undo uncommitted changes
git checkout -- filename
git restore filename
```

### Fix Mistakes
```bash
# Amend last commit
git commit --amend -m "New commit message"

# Fix author of last commit
git commit --amend --author="Your Name <email@example.com>"

# Reset to remote state
git reset --hard origin/main
```

### Clean Repository
```bash
# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Dry run (see what would be removed)
git clean -n
```

## 📋 Useful Aliases

Add to `~/.gitconfig`:
```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
    lg = log --oneline --graph --all
    amend = commit --amend
    wip = commit -am "WIP"
    unwip = reset HEAD~1
```

## 🎯 Best Practices

### Commit Messages
- Use imperative mood: "Add feature" not "Added feature"
- Keep first line under 50 characters
- Use body for detailed explanation
- Reference issues: "Closes #123"

### Branch Naming
- `feature/description`: New features
- `bugfix/description`: Bug fixes
- `hotfix/description`: Critical fixes
- `release/version`: Release preparation

### Workflow
1. Create feature branch from main
2. Make small, focused commits
3. Push frequently
4. Create PR when feature is complete
5. Delete branch after merge

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI](https://cli.github.com/)

---

**Happy coding! 🚀**
