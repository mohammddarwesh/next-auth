# GitHub Finalization Todo

## Branches
- [ ] Ensure `dev/v1.0.0` exists with the latest code
- [ ] Create `prod/v1.0.0` branch ready for PR

## Commits
- [ ] Clean up commit messages (feat, fix, chore, etc.)
- [ ] Make commit messages clear and concise

## Environment
- [x] Create `.env.example` with placeholders (completed)
- [x] Verify all required environment variables are documented (completed)

## Documentation
- [x] Update `README.md` with:
  - [x] Project overview
  - [x] Features + Tech stack
  - [x] Local setup instructions
  - [x] Environment variables
  - [x] Testing instructions
  - [x] Deployment notes

## Git Configuration
- [x] Verify `.gitignore` includes required entries (completed)
  - [x] `.env*` (except `.env.example`)
  - [x] `node_modules/`
  - [x] `.next/`
  - [x] `dist/`
  - [x] `build/`

## Pull Request
- [ ] Create PR from `dev/v1.0.0` → `prod/v1.0.0`
- [ ] Write professional PR description
- [ ] Include relevant screenshots

## Versioning
- [ ] After merge:
  - [ ] Create tag `v1.0.0`
  - [ ] Create GitHub Release with release notes

## Optional Tasks
- [ ] Set up CI/CD workflow in `.github/workflows/ci.yml`
  - [ ] Add `npm ci` step
  - [ ] Add `npm run build` step
- [ ] Add Docker configuration:
  - [ ] Create `Dockerfile`
  - [ ] Create `docker-compose.yml`

## Notes
- Use conventional commit messages (feat, fix, chore, etc.)
- Keep commit messages clear and descriptive
- Ensure all sensitive data is in `.env` and not committed
- Test thoroughly before creating the release
