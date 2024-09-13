import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdDelete } from "react-icons/md";
import { Loading } from "../Loading";

interface ReviewProps {
  username: string;
  created_at: string;
  review: string;
  rating: number;
  id: number;
}

export function Reviews({ isReadOnly = true }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, userName } = useAuth();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/reviews/product/${productId}`);

        if (response.data.length > 0) {
          setReviews(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar reviews do produto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        `/reviews/${productId}`,
        {
          username: userName,
          rating,
          review: comment,
        },
        {
          headers: { "x-access-token": token },
        }
      );

      if (response.status === 201) {
        toast.success("Avaliação enviada com sucesso!", {
          position: "top-center",
          toastId: "success",
          hideProgressBar: true,
          autoClose: 3000,
          pauseOnHover: false,
          closeButton: false,
          className: "text-center",
          onClose: () => {
            window.location.reload();
          },
        });
        setRating(5);
        setComment("");
      } else {
        toast.error("Erro ao enviar avaliação.", {
          position: "top-center",
          toastId: "error",
          hideProgressBar: true,
          autoClose: 3000,
          pauseOnHover: false,
          closeButton: false,
          className: "text-center",
        });
      }
    } catch (error) {
      toast.error("Erro ao enviar avaliação.", {
        position: "top-center",
        toastId: "error",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container d-flex flex-column">
      <div className="list-group my-4">
        {reviews.map((review, index) => {
          const fullStars = Math.floor(review.rating);
          const halfStar = review.rating % 1 >= 0.5 ? 1 : 0;
          const emptyStars = 5 - fullStars - halfStar;

          return (
            <div
              key={index}
              className="list-group-item list-group-item-action mb-3 p-3 border rounded shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">
                  {review.username || "Usuário desconhecido"}
                </h5>
                <small className="text-muted">
                  {formatDistance(
                    new Date(review.created_at),
                    new Date(),
                    {
                      addSuffix: true,
                      locale: ptBR,
                    }
                  )}
                </small>
              </div>
              <div className="d-flex gap-1 mb-2">
                {[...Array(fullStars)].map((_, i) => (
                  <FaStar key={`full-${i}`} size={15} color="gold" />
                ))}
                {[...Array(halfStar)].map((_, i) => (
                  <FaStar key={`half-${i}`} size={15} color="gold" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                  <FaRegStar key={`empty-${i}`} size={15} color="gray" />
                ))}
              </div>
              <p className="mb-2">{review.review}</p>
              {userName === "Administrador" && (
                <small className="text-muted d-flex justify-content-end">
                  <MdDelete
                    size={20}
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={async () => {
                      await api.delete(`/reviews/${review.id}`),
                        toast.success("Avaliação deletada com sucesso!", {
                          position: "top-center",
                          toastId: "success",
                          hideProgressBar: true,
                          autoClose: 3000,
                          pauseOnHover: false,
                          closeButton: false,
                          className: "text-center",
                          onClose: () => {
                            window.location.reload();
                          },
                        });
                    }}
                  />
                </small>
              )}
            </div>
          );
        })}
      </div>
      <h1 className="text-center">Deixe sua avaliação</h1>
      <div className="star-rating d-flex gap-2 justify-content-center mt-2 mb-3">
        {[...Array(5)].map((_, i) =>
          i < rating ? (
            <FaStar
              key={`full-${i}`}
              size={25}
              color="gold"
              onClick={() => handleStarClick(i + 1)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegStar
              key={`empty-${i}`}
              size={25}
              color="gray"
              onClick={() => handleStarClick(i + 1)}
              style={{ cursor: "pointer" }}
            />
          )
        )}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-100 border rounded mb-3 p-2"
        placeholder={
          isReadOnly
            ? "Este produto é uma demonstração."
            : "Deixe sua avaliação..."
        }
        rows={5}
        readOnly={isReadOnly}
      ></textarea>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!comment}
        >
          Enviar avaliação
        </button>
      </div>
    </div>
  );
}
