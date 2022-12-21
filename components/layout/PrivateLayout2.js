export const PrivateLayout2 = ({ children }) => (
  <>
    <main className='display'>{children}</main>
  </>
)

export const privateLayout2 = (page) => <PrivateLayout2>{page}</PrivateLayout2>
