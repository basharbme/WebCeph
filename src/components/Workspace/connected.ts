import {
  connect,
  MapStateToProps,
  MapDispatchToPropsFunction,
} from 'react-redux';
import CephaloDropzone from './index';
import {
  StateProps,
  DispatchProps,
  OwnProps,
} from './props';
import { isAnyImageLoading } from 'store/reducers/workspace/image';
import {
  workspaceHasError,
  getWorkspaceErrorMessage,
  getWorkspaceImageIds,
} from 'store/reducers/workspace';
import {
  getWorkspaceMode,
} from 'store/reducers/workspace/mode';
import {
  canvasResized,
  ignoreWorkspaceError,
} from 'actions/workspace';

const mapStateToProps: MapStateToProps<StateProps, OwnProps> = (state: StoreState) => {
  const imageIds = getWorkspaceImageIds(state);
  return {
    imageIds,
    mode: getWorkspaceMode(state),
    isLoading: isAnyImageLoading(state)(imageIds),
    hasError: workspaceHasError(state),
    errorMessage: getWorkspaceErrorMessage(state),
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> = (dispatch) => (
  {
    onResize: (rect) => dispatch(canvasResized(rect)),
    onRequestDismissError: () => dispatch(ignoreWorkspaceError(void 0)),
  }
);

const connected = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, mapDispatchToProps,
)(CephaloDropzone);


export default connected;
