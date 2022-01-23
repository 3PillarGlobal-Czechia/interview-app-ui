# Folder structure

Check URL: https://www.robinwieruch.de/react-folder-structure/

### Example:

```
- src/

--- pages/ (Root components of page)
----- UserPage/
------- UserPage.tsx
------- UserPage.module.scss
------- UserPageProps.ts
----- PaymentPage/
------- PaymentPage.tsx
------- PaymentPage.module.scss


--- router/ (Routing)
----- index.ts
or
----- publicRoutes.tsx
----- privateRoutes.tsx



--- domain/ (Components for domain)
----- User/
------- Profile/
------- Avatar/
----- Message/
------- MessageItem/
------- MessageList/
----- Payment/
------- PaymentForm/
------- PaymentWizard/
------- services/
--------- currency/
----------- currency.ts
----------- currency.test.ts
------- hooks/ (Hooks for Payment domain)
--------- useBody/
----------- useBody.ts
----------- useBody.test.ts
------- contexts/ (Contexts for Payment domain)
-------- PaymentContext/
---------- PaymentContext.tsx
---------- PaymentContext.test.ts

--- components/ (Global components used throught all app)
----- Button/
------- Button.tsx
------- Button.module.scss
------- ButtonProps.tsx
----- Input/
------- Input.tsx
------- Input.module.scss
------- InputProps.tsx

--- hooks/ (Global hooks used for all app)
----- useWatchResize.ts

--- context/ (Global contexts used for all app)
----- AppContext.tsx

-- enums/ (Global enums used for all app)

-- interfaces/ || types/ (Global interfaces/types used for all app)

--- services/ (Global services used for all app)
----- format/
------- date/
--------- date.ts
--------- date.test.ts
```

### Notes:

`services`: services can contain helper functions for formating, fetching data from server, ...

#### Important:

1. You need to be careful to not nest too deeply your components into each other. Rule of thumb is that we never nesting
   components more than three levels, so the `/Payment/service/current` folders would be alright, but put another folder
   into current folder would not be right!
2. You are not obliged to strictly hold naming of the `folders/files` as above
3. You should hold logic structure as above and keep this rules:
   1. If `components/interface/...` is used in more domains/pages should be stored in root
   2. If `components/interface/...` is used for specific domain should be stored to domain specific folder
4. If file or folder:
   1. contains component should be capitalized camelCase and file extension should be `.tsx`
   2. not contains component should be camelCase and file extension should be `.ts`
5. SCSS files are postfixed by `.module`
6. If subtree `pages/PaymentPage` should contain more `interfaces/types/enums` create specific folder for it

```
-- pages/
----- PaymentPage/
------- interfaces/
--------- IPayment.ts
--------- ITransaction.ts
------- PaymentPage.tsx
------- PaymentPage.module.scss
------- PaymentPageProps.ts
```

7. Separate component props type into own file is optional. If components has more than 20 props you should
   consider creating new file for it.

```
----- UserPage/
------- UserPage.tsx
------- UserPage.module.scss
------- UserPageProps.ts (is optional)
----- PaymentPage/
------- PaymentPage.tsx
------- PaymentPage.module.scss
```
