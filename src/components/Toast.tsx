import * as React from 'react';
import cx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { ToastProps } from '../types';
import { Default, isFn } from '../utils';
import { useToast } from '../hooks';

export const Toast: React.FC<ToastProps> = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  } = useToast(props);
  const {
    closeButton,
    children,
    autoClose,
    onClick,
    type,
    hideProgressBar,
    closeToast,
    transition: Transition,
    position,
    className,
    style,
    bodyClassName,
    bodyStyle,
    progressClassName,
    progressStyle,
    updateId,
    role,
    progress,
    rtl,
    toastId,
    deleteToast,
    isIn
  } = props;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__toast--rtl`]: rtl
    }
  );
  const cssClasses = isFn(className)
    ? className({
      rtl,
      position,
      type,
      defaultClassName
    })
    : cx(defaultClassName, className);
  const isProgressControlled = !!progress;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return;

    const props = { closeToast, type };

    if (isFn(closeButton)) return closeButton(props);

    if (React.isValidElement(closeButton))
      return React.cloneElement(closeButton, props);
  }
  return (
    <Transition
      isIn={isIn}
      done={deleteToast}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
    >
      {/* Single Toast */}
      <div
        id={toastId as string}
        onClick={onClick}
        className={cssClasses}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div
          {...(isIn && { role: role })}
          className={
            isFn(bodyClassName)
              ? bodyClassName({ type })
              : cx(`${Default.CSS_NAMESPACE}__toast-header`, bodyClassName)
          }
          style={bodyStyle}
        >
          {children} {renderCloseButton(closeButton)}
        </div>

        <div
          {...(isIn && { role: role })}
          className={
            isFn(bodyClassName)
              ? bodyClassName({ type })
              : cx(`${Default.CSS_NAMESPACE}__toast-body`, bodyClassName)
          }
          style={bodyStyle}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <svg width="32" height="32" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0C15.7978 0 10.3292 2.26517 6.2972 6.2972C2.26517 10.3292 0 15.7978 0 21.5C0 27.2022 2.26517 32.6708 6.2972 36.7028C10.3292 40.7348 15.7978 43 21.5 43C27.2022 43 32.6708 40.7348 36.7028 36.7028C40.7348 32.6708 43 27.2022 43 21.5C43 15.7978 40.7348 10.3292 36.7028 6.2972C32.6708 2.26517 27.2022 0 21.5 0ZM4.03125 21.5C4.03156 18.098 5.02522 14.7701 6.89027 11.9249C8.75531 9.07966 11.4106 6.84094 14.53 5.48356C17.6495 4.12617 21.0975 3.70919 24.4506 4.28381C27.8037 4.85844 30.9161 6.39965 33.4056 8.71825L16.125 16.125L8.71825 33.4056C5.70091 30.1762 4.02523 25.9197 4.03125 21.5ZM24.5718 24.5718L13.8191 29.1809L18.4282 18.4282L24.5718 24.5718ZM21.5 38.9688C17.0803 38.9748 12.8238 37.2991 9.59437 34.2817L26.875 26.875L34.2817 9.59437C36.6003 12.0839 38.1416 15.1963 38.7162 18.5494C39.2908 21.9025 38.8738 25.3505 37.5164 28.47C36.1591 31.5894 33.9203 34.2447 31.0751 36.1097C28.2299 37.9748 24.902 38.9684 21.5 38.9688Z" fill="white" />
          </svg> */}
            <svg width="32" height="32" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.9165 4.41669C14.0614 4.41669 4.4165 14.0616 4.4165 25.9167C4.4165 37.7718 14.0614 47.4167 25.9165 47.4167C37.7716 47.4167 47.4165 37.7718 47.4165 25.9167C47.4165 14.0616 37.7716 4.41669 25.9165 4.41669ZM8.7165 25.9167C8.7165 23.9838 9.0519 22.1284 9.64315 20.3933L13.0165 23.7667L17.3165 28.0667V32.3667L21.6165 36.6667L23.7665 38.8167V42.9683C15.2977 41.9041 8.7165 34.6715 8.7165 25.9167ZM39.526 36.3936C38.1221 35.2627 35.9936 34.5167 34.5165 34.5167V32.3667C34.5165 31.2262 34.0635 30.1325 33.2571 29.3261C32.4507 28.5197 31.3569 28.0667 30.2165 28.0667H21.6165V21.6167C22.7569 21.6167 23.8507 21.1636 24.6571 20.3572C25.4635 19.5508 25.9165 18.4571 25.9165 17.3167V15.1667H28.0665C29.2069 15.1667 30.3007 14.7136 31.1071 13.9072C31.9135 13.1008 32.3665 12.0071 32.3665 10.8667V9.98304C38.6617 12.5394 43.1165 18.7142 43.1165 25.9167C43.1161 29.7108 41.8529 33.3968 39.526 36.3936Z" fill="white" />
            </svg>

          </div>
          <div style={{ paddingLeft: 8 }}>
            <p style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Traveller</p>
            <p style={{ fontSize: '14px', margin: 0 }}>You visited 5 pages on adilnaqvi.com</p>
          </div>

        </div>
        {(autoClose || isProgressControlled) && (
          <ProgressBar
            {...(updateId && !isProgressControlled
              ? { key: `pb-${updateId}` }
              : {})}
            rtl={rtl}
            delay={autoClose as number}
            isRunning={isRunning}
            isIn={isIn}
            closeToast={closeToast}
            hide={hideProgressBar}
            type={type}
            style={progressStyle}
            className={progressClassName}
            controlledProgress={isProgressControlled}
            progress={progress}
          />
        )}
      </div>
    </Transition>
  );
};
