# Callback Popup Validation Notes

The desktop exit-intent condition was triggered in the live preview using a top-edge mouse-leave event after clearing the session-level popup state. The accessible dialog opened successfully with the supplied image, the “Request a callback.” title, and all three callback inputs: name, work email, and callback number.

The desktop popup was visually reviewed with its left-side supplied visual and right-side callback form. Closing it wrote the `dismissed` session state; the brief presence of the dialog immediately after the close interaction is its configured close animation and will be checked after that animation completes.

After the close animation completed, the dialog was removed and its `dismissed` session state remained in place, so a second desktop exit-intent event could not reopen it in the same session. The normal mobile homepage layout was also reviewed at a narrow viewport; callback-popup CSS does not alter the underlying page flow. Mobile one-minute engagement eligibility is covered by a direct trigger-helper test using the production 160px scroll threshold and 60,000ms timer constant.

The open callback popup was also reviewed at a 375px-wide viewport using a development-only visual test path that was removed before production validation. Its supplied visual stacks above the form, all three callback fields remain fully visible, and the close/dismiss controls remain reachable. TypeScript, seven test files with sixteen tests, and the production build passed after removing the temporary test path.

The live callback form was also opened in a fresh desktop session and submitted empty without sending any test lead. It remained open and announced the required-field feedback “Please add your name.”, confirming the client-side validation path and accessible status message are wired before any data reaches the server.
