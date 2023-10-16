# Astra Zeneca Bevespi
AEM Sites with Edge Delivery site implementing https://www.bevespi.com/

## Environments
- Preview: https://main--bevespi--hlxsites.hlx.page/
- Live: https://main--bevespi--hlxsites.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## Notes about development
 
### CSS/Styling

1. The root font size (in html) is set to `10px` (`62.5%` of `16px`). According to the above, `1rem` = `10px` (`1.6rem` = `16px`): this makes sizes in `rem` - which are great for accommodating responsiveness and accessibility - human readable
2. According to our analysis and mainstream recommendations, we decided to use `rem` only for font-size and correlated metrics (like line-height), while `px` for the remainder - like border width, element sizing/padding/margins - and in general where the requirement of having fixed dimensions and/or references is predominant