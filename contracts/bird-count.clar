(define-data-var counter uint u0)

(define-read-only (get-counter)
  (var-get counter))

(define-public (increment)
  (let
    (
      (current-val (var-get counter))
      (next-val (+ current-val u1))
    )
    (var-set counter next-val)
    (ok true)
  )
)

(define-public (decrement)
  (let
    (
      (current-val (var-get counter))
      (next-val (- current-val u1))
    )
    (var-set counter next-val)
    (ok true)
  )
)
