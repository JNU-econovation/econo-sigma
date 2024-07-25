package sigma.chackcheck.common.service;

import java.util.List;

public interface GetEntityUsecase<T> {
    T getOneEntity(Long id);
    List<T> getAllEntities();
}
