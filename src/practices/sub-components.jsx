// OK
function App() {
  return (
    <Modal cancelText='Exit' saveText='Accept changes'>
      Im a modal
    </Modal>
  );
}

function Modal({ children, cancelText, saveText, cancelClasses, saveClasses }) {
  return (
    <aside>
      {children}
      <button className={cancelClasses}>{cancelText}</button>
      <button className={saveClasses}>{saveText}</button>
    </aside>
  );
}

// BETTER (scale better)
function App() {
  return (
    <Modal>
      <Modal.CancelAction>
        <a className='whatever-style' href='#'>
          Cancel
        </a>
      </Modal.CancelAction>

      <Modal.SaveAction>
        <button>Save</button>
      </Modal.SaveAction>
    </Modal>
  );
}

function Modal() {
  return React.Children.map(children, child => {
    return React.cloneElement(child);
  });
}

function CancelAction({ children }) {
  return children;
}

function SaveAction({ children }) {
  return children;
}

Modal.CancelAction = CancelAction;
Modal.SaveAction = SaveAction;
