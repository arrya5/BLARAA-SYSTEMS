# Contributing to BLARAA Systems

First off — thank you for taking the time to contribute! 🎉 BLARAA Systems is an open-source effort to make Indian energy and carbon compliance accessible, and contributions of every size are welcome: bug fixes, new compliance modules, documentation, or even just flagging an outdated government formula.

## Ways to contribute

- 🐛 **Report a bug** — open an issue with steps to reproduce.
- 💡 **Suggest a feature** — open an issue describing the problem it solves.
- 📚 **Improve docs** — fix typos, clarify formulas, or add source links in `docs/`.
- 🧮 **Update a calculation** — if a BEE/CERC order or gazette notification changes, update the formula and cite the source.
- 🛠️ **Submit code** — pick an open issue (ideally one labeled `good first issue`) and send a pull request.

## Development setup

See the [README](README.md) for full setup. In short:

```bash
# Frontend
cd frontend && npm install && npm start

# Backend (CBAM only)
cd backend && python -m venv .venv && pip install -r requirements.txt && uvicorn api:app --reload
```

## Pull request process

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b fix/short-description
   ```
2. **Make your change.** Keep PRs focused — one logical change per PR.
3. **Cite your source.** If you touch any compliance calculation, link the official notification/order it comes from.
4. **Test locally** to confirm nothing breaks.
5. **Commit** with a clear message:
   ```
   fix: correct REC buyout price for FY 2028-29
   ```
6. **Push** and open a Pull Request against `main`. Reference any related issue (e.g. `Fixes #12`).
7. Respond to review feedback — a maintainer will merge once it's ready.

## Code style

- **Frontend:** follow the existing React + Tailwind conventions in `frontend/src`.
- **Backend:** follow PEP 8 for Python; keep FastAPI route logic small and testable.
- Prefer clear, descriptive names over comments where possible.

## Reporting an issue

When opening an issue, please include:
- What you expected to happen vs. what actually happened
- Steps to reproduce
- The tool involved (CarbonFile / ComplianceCore / RenewTrack)
- Screenshots or error logs if relevant

## Code of conduct

Be respectful and constructive. We want this to be a welcoming project for first-time open-source contributors.

---

Questions? Open an issue or reach out to [@arrya5](https://github.com/arrya5).
