import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const OauthCallbackDocusignPage = () => {
  return (
    <>
      <MetaTags title="OauthCallbackDocusign" description="OauthCallbackDocusign page" />

      <h1>OauthCallbackDocusignPage</h1>
      <p>
        Find me in <code>./web/src/pages/OauthCallbackDocusignPage/OauthCallbackDocusignPage.tsx</code>
      </p>
      <p>
        My default route is named <code>oauthCallbackDocusign</code>, link to me with `
        <Link to={routes.oauthCallbackDocusign()}>OauthCallbackDocusign</Link>`
      </p>
    </>
  )
}

export default OauthCallbackDocusignPage
